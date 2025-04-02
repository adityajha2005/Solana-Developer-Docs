// import { findMetadataPda, mplTokenMetadata, verifyCollectionV1 } from "@metaplex-foundation/mpl-token-metadata";
// import { keypairIdentity, publicKey as UMIPublicKey } from "@metaplex-foundation/umi";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { IrysUploader } from "@metaplex-foundation/umi-uploader-irys";
// import { airdropIfRequired, getExplorerLink, getKeypairFromFile } from "@solana-developers/helpers";
// import { clusterApiUrl,Connection,LAMPORTS_PER_SOL } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"));
// const keypairPath = "/home/aditya/.config/solana/id.json";
// const user = await getKeypairFromFile(keypairPath);
// console.log("Loaded user:", user.publicKey.toBase58());

// await airdropIfRequired(
//     connection,
//     user.publicKey,
//     1* LAMPORTS_PER_SOL,
//     0.1* LAMPORTS_PER_SOL
// )

// const umi = createUmi(connection)

// //connection address from create metaplex nft collection
// const collectionAddress = UMIPublicKey("https://explorer.solana.com/address/EXE1Y4fypcHgVu56X1N66gb2GtPUUgwP1oR1ehatBpmC?cluster=devnet");
// //nft address from create metaplex nft collection
// const nftAddress = UMIPublicKey("BXbnE3EKb7WMcUjotoXCZDbWCS1iszYToqBoFuPhuJDy");
// const metadata = findMetadataPda(umi,{mint:nftAddress});
// await verifyCollectionV1(umi,{
//     metadata,
//     collectionMint: collectionAddress,
//     authority:umi.identity,
// }).sendAndConfirm(umi);

// let explorerLink = getExplorerLink("address",nftAddress,"devnet")
// console.log(`verified collection:  ${explorerLink}`);
