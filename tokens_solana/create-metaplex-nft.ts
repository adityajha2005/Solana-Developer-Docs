import { createNft, findMetadataPda, mplTokenMetadata, verifyCollectionV1 } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, generateSigner, keypairIdentity, percentAmount, publicKey as UMIPublicKey } from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { airdropIfRequired, getExplorerLink, getKeypairFromFile } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { promises as fs } from "fs";
import * as path from "path";
import { collectionAddress } from "@metaplex-foundation/mpl-core";

const connection = new Connection(clusterApiUrl("devnet"));
const keypairPath = "/home/aditya/.config/solana/id.json";
const user = await getKeypairFromFile(keypairPath);

await airdropIfRequired(
    connection,
    user.publicKey,
    1* LAMPORTS_PER_SOL,
    0.1* LAMPORTS_PER_SOL
)

const umi = createUmi(connection)
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
umi.
    use(keypairIdentity(umiKeypair))
    .use(mplTokenMetadata())
    .use(irysUploader());

//collection nft address from create metaplex nft collection
const collectionNftAddress = UMIPublicKey("EXE1Y4fypcHgVu56X1N66gb2GtPUUgwP1oR1ehatBpmC")
const nftData = {
    name: "My NFT",
    symbol: "MN",
    description: "My NFT Description",
    sellerFeeBasisPoints: 0,
    imageFile: "nft.png",
  };

const NFTImagePath = path.resolve(__dirname, nftData.imageFile);
const buffer = await fs.readFile(NFTImagePath);
let file = createGenericFile(buffer, NFTImagePath,{
    contentType: "image/png",
});

//upload image to get uri
const [image] = await umi.uploader.upload([file]);
console.log("image uri:", image);

//upload offchain data
const uri = await umi.uploader.uploadJson({
    name: nftData.name,
    symbol: nftData.symbol,
    description: nftData.description,
    image,
})
console.log("NFT offchain metadata URI:", uri); 

//generate mint keypair
const mint = generateSigner(umi);

await createNft(umi,{
    mint,
    name:nftData.name,
    symbol:nftData.symbol,
    uri,
    updateAuthority: umi.identity.publicKey,
    sellerFeeBasisPoints: percentAmount(0),
    collection:{
        key: collectionNftAddress,
        verified:false,
    },
}).sendAndConfirm(umi,{send:{commitment:"finalized"}});

let explorerLink = getExplorerLink("address", mint.publicKey, "devnet");
console.log(`Token Mint:  ${explorerLink}`);

//Token Mint:  
//https://explorer.solana.com/address/42vk1tn1xBgktorceGe8mquzgVhapx649Pr8Sbqdbm8H?cluster=devnet