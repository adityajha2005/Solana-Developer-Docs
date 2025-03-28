//this not working bcuz of dependency issues

// import { createMint } from "@solana/spl-token";
// import dotenv from "dotenv";
// dotenv.config();
// import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
// import { Connection, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
// // import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
// import { mplCore } from "@metaplex-foundation/mpl-core";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { createMetadataAccountV3 } from '@metaplex-foundation/mpl-token-metadata'
// import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
// const user = getKeypairFromEnvironment("SECRET_KEY")
// const connection = new Connection(clusterApiUrl("devnet"));

// console.log(`loaded keypair from environment: ${user.publicKey.toBase58()}`)

// const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
//     "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
//   );

//   const tokenMintAccount = new PublicKey("DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV"); //update this with your token mint address

//   const metadataData = {
//     name: "RCB",
//     symbol: "IPL",
//     uri: "https://arweave.net/1234",
//     sellerFeeBasisPoints: 0,
//     creators: null,
//     collection: null,
//     uses: null,
//   };

//   const metadataPDAAndBump = PublicKey.findProgramAddressSync(
//     [
//         Buffer.from("metadata"),
//         TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//         tokenMintAccount.toBuffer(),
//     ],
//     TOKEN_METADATA_PROGRAM_ID
//   );

// const metadataPDA = metadataPDAAndBump[0];
// const transaction = new Transaction()

// const createMetadataAccountInstruction  = 
// createMetadataAccountV3({
//     metadata: metadataPDA,
//     mint: tokenMintAccount,
//     mintAuthority:  user.publicKey,
//     payer:  user.publicKey,
//     updateAuthority: user.publicKey,
// },
// {
//     createMetadataAccountArgsV3:{
//         collectionDetails: null,
//         data: metadataData,
//         isMutable: true
//     }
// })
// transaction.add(createMetadataAccountInstruction);

// const transactionSignature = await sendAndConfirmTransaction(
//     connection,
//     transaction,
//     [user],
// )

// const transactionLink = getExplorerLink(
//     "transaction",
//     transactionSignature,
//     "devnet"
// );
// console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}`);

// const tokenMintLink = getExplorerLink(
//     "address",
//     tokenMintAccount.toString(),
//     "devnet",
// )

// console.log(`✅ Look at the token mint again: ${tokenMintLink}`);


// // const tokenMint = await createMint(connection,user,user.publicKey,null,2);
// // const tokenMint = await createMint(connection,user,user.publicKey,null,2)
// // const link = getExplorerLink("address",tokenMint.toString(),"devnet");

// // console.log(` finished , created token mint ${link}`);