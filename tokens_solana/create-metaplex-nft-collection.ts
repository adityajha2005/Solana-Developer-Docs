import {
    createNft,
    mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, generateSigner, keypairIdentity, percentAmount } from "@metaplex-foundation/umi";
import { irysUploader, IrysUploader, isIrysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { airdropIfRequired, getExplorerLink, getKeypairFromFile } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { promises as fs } from "fs"
import * as path from "path";

const connection = new Connection(clusterApiUrl("devnet"))
const keypairPath = "/home/aditya/.config/solana/id.json";
const user = await getKeypairFromFile(keypairPath);

await airdropIfRequired(
    connection,
    user.publicKey,
    1* LAMPORTS_PER_SOL,
    0.1* LAMPORTS_PER_SOL
);
console.log("Loaded user:", user.publicKey.toBase58());

const umi = createUmi(connection)
const umiKeyPair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
umi
    .use(keypairIdentity(umiKeyPair))
    .use(mplTokenMetadata())
    .use(irysUploader());


const collectionImagePath = path.resolve(__dirname, "collection.png");
const buffer = await fs.readFile(collectionImagePath);
let file = createGenericFile(buffer, collectionImagePath,{
    contentType: "image/png",
});
const [image] = await umi.uploader.upload([file]);
console.log("image uri:", image);

const uri = await umi.uploader.uploadJson({
    name:"My NFT Collection",
    symbol: "MNC",
    description:"This is my first NFT collection",
    image,
})
console.log("Collection offchain metadata URI:", uri);

//generating mint keypair 
const collectionMint = generateSigner(umi);

//time to create and mint nft collection
await createNft(umi,{
    mint:collectionMint,
    name:"My NFT Collection",
    uri,
    updateAuthority: umi.identity.publicKey,
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: true,
}).sendAndConfirm(umi,{send:{commitment:"finalized"}});

let explorerLink = getExplorerLink(
    "address",
    collectionMint.publicKey,
    "devnet"
);

console.log(`Collection NFT:  ${explorerLink}`);
console.log(`Collection NFT address is:`, collectionMint.publicKey);
console.log("✅ Finished successfully!");

// image uri: https://gateway.irys.xyz/2GjvXTnALQ9h5SgkaBwxtVmmsHWY4YZP7rGX1AT7f9cR
// Collection offchain metadata URI: https://gateway.irys.xyz/Cfe1WhfsrY89SHyw9EwbvCpCu2PEHLPzHDtsnVGgKmXR
// Collection NFT:  https://explorer.solana.com/address/EXE1Y4fypcHgVu56X1N66gb2GtPUUgwP1oR1ehatBpmC?cluster=devnet
// Collection NFT address is: EXE1Y4fypcHgVu56X1N66gb2GtPUUgwP1oR1ehatBpmC
// ✅ Finished successfully!