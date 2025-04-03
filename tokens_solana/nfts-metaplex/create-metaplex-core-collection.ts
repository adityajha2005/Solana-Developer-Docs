import { createCollection, mplCore } from "@metaplex-foundation/mpl-core";
import {
    createGenericFile,
    generateSigner,
    keypairIdentity,
    percentAmount,
    sol,
  } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {promises as fs} from "fs";
import * as path from "path";

const connection = new Connection(clusterApiUrl("devnet"))
const user = await getKeypairFromFile();
await airdropIfRequired(
  connection,
  user.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.1 * LAMPORTS_PER_SOL
)
//create collection to devnnet cluster
const umi = createUmi(connection).use(mplCore()).use(irysUploader());
//converting to umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

umi.use(keypairIdentity(umiKeypair));


const collectionImagePath = "collection.png";

const buffer = await fs.readFile(collectionImagePath);
let file = createGenericFile(buffer, collectionImagePath, {
  contentType: "image/png",
});
const [image] = await umi.uploader.upload([file]);
console.log("image uri:", image);

const metadata = {
  name: "My Collection",
  description: "My Collection description",
  image,
  external_url: "https://example.com",
  properties: {
    files: [
      {
        uri: image,
        type: "image/jpeg",
      },
    ],
    category: "image",
  },
};

//upload offchain json to Arweave
const uri = await umi.uploader.uploadJson(metadata);
console.log("Collection offchain metadata URI:", uri);

const collection = generateSigner(umi)
await createCollection(umi,{
  collection,
  name: "My Collection",
  uri,
}).sendAndConfirm(umi,{ send: {commitment: "finalized"}});
let explorerLink = getExplorerLink("address", collection.publicKey, "devnet");
console.log(`Collection: ${explorerLink}`);
console.log(`Collection address is:  ${collection.publicKey}`);
console.log("✅ Finished successfully!");  

// image uri: https://gateway.irys.xyz/GMdMTjdLEZi3R1ta9au8JqWPLW1UpQo1qS6NHsxzsPVf
// Collection offchain metadata URI: https://gateway.irys.xyz/4h4LtRM1Spn9vJcS2CvpPjAc81RnNpTABXDe4yCp4E7V
// Collection: https://explorer.solana.com/address/9P6Z6bCprKyD6BjZee9zpSn1s7Hq9xKCydChsFU4a8Ze?cluster=devnet
// Collection address is:  9P6Z6bCprKyD6BjZee9zpSn1s7Hq9xKCydChsFU4a8Ze
// ✅ Finished successfully!