import { mintTo } from "@solana/spl-token";
import { Connection, PublicKey , clusterApiUrl } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { publicKey } from "@metaplex-foundation/umi";
const connection = new Connection(clusterApiUrl("devnet"))

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10,2)

const user = getKeypairFromEnvironment("SECRET_KEY");
const tokenMintAccount = new PublicKey("DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV") //metadata address

const recipientAssociatedTokenAccount = new PublicKey(
    "AbydrJGyHGAF4JjTbouWFoksganph2xR96sGYpf2icb1", //token account address
  );

const transactionSignature  = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10*MINOR_UNITS_PER_MAJOR_UNITS, //minted 10 tokens
)
const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);

//✅ Success! Mint Token Transaction: 
// https://explorer.solana.com/tx/YAssK2eYPmgjJhq7vFgSZYh7TLr28SknpjBikeSZDGn8Rmrjt1fR4EZnhD4FyAdKkTmjG9bTo8puByQtDHQtvy2?cluster=devnet