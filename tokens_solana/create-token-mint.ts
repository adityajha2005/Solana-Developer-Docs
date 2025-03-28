import { createMint } from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY")

console.log(`loaded keypair from environment: ${user.publicKey.toBase58()}`)

// const tokenMint = await createMint(connection,user,user.publicKey,null,2);
const tokenMint = await createMint(connection,user,user.publicKey,null,2)
const link = getExplorerLink("address",tokenMint.toString(),"devnet");

console.log(` finished , created token mint ${link}`);