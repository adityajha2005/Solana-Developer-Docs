import { mplCore, create, fetchCollection, fetchAsset, update } from "@metaplex-foundation/mpl-core";
import { generateSigner,keypairIdentity,publicKey as UMIPublicKey, createGenericFile } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { airdropIfRequired, getExplorerLink, getKeypairFromFile } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { promises as fs } from "fs";
import * as path from "path";

const connection = new Connection(clusterApiUrl("devnet"));
const user = await getKeypairFromFile();
console.log("Loaded user:", user.publicKey.toBase58());

await airdropIfRequired(
    connection,
    user.publicKey,
    1* LAMPORTS_PER_SOL,
    0.1 * LAMPORTS_PER_SOL
)

const umi = createUmi(connection).use(mplCore()).use(irysUploader());
//converting to umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
//assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
umi.use(keypairIdentity(umiKeypair));
const assesImagePath = "collection.png";
const buffer = await fs.readFile(assesImagePath);
let file = createGenericFile(buffer, assesImagePath, {
    contentType: "image/png",
});

const [image] = await umi.uploader.upload([file]);
console.log("image uri:", image);

const metadata = {
    name: "My Updated Asset",
    description: "My Updated Asset Description",
    image,
    external_url: "https://example.com",
    attributes: [
      {
        trait_type: "trait1",
        value: "value1",
      },
      {
        trait_type: "trait2",
        value: "value2",
      },
    ],
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
  
const uri = await umi.uploader.uploadJson(metadata);
console.log("Asset offchain metadata URI:", uri);
//fetching account using address
const asset = await fetchAsset(umi, UMIPublicKey("vkzwdTvWndA9PnAuM1WsYHbRtmbwAPiE7G7pKJKfS6o"));
const collection = await fetchCollection(
  umi,
  UMIPublicKey("9P6Z6bCprKyD6BjZee9zpSn1s7Hq9xKCydChsFU4a8Ze"),
);

await update(umi, {
    asset,
    collection,
    name: "My Updated Asset",
    uri,
  }).sendAndConfirm(umi);
  
  let explorerLink = getExplorerLink("address", asset.publicKey, "devnet");
  console.log(`Asset updated with new metadata URI: ${explorerLink}`);
  
  console.log("✅ Finished successfully!");

//   Asset offchain metadata URI: https://gateway.irys.xyz/HsyvE3m1hXQQwFfCFLhMniK8Ej5LoyXrutK9p6vAkjMB
// Asset updated with new metadata URI: https://explorer.solana.com/address/vkzwdTvWndA9PnAuM1WsYHbRtmbwAPiE7G7pKJKfS6o?cluster=devnet