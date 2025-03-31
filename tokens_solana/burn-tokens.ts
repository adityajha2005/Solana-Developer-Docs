import dotenv from "dotenv"
dotenv.config();
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey, SystemProgram } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, burn } from "@solana/spl-token";

const DEVNET_URL = clusterApiUrl("devnet")
const TOKEN_DECIMALS=2;
const BURN_AMOUNT =5;
const tokenMintAddress = "DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV"
const connection = new Connection(DEVNET_URL)
const user = getKeypairFromEnvironment("SECRET_KEY")
console.log(`🔑 Loaded keypair. Public key: ${user.publicKey.toBase58()}`);

try{
    const tokenMintAccount = new PublicKey(tokenMintAddress)

    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAccount,
        user.publicKey,
    );
    const burnamount = BURN_AMOUNT*10**TOKEN_DECIMALS; // 5 tokens
    console.log(`💸 Attempting to burn ${BURN_AMOUNT} tokens...`);

    const transactionSignature = await burn(
        connection,
        user,
        userTokenAccount.address,
        tokenMintAccount,
        user,
        burnamount,    
    )
    const explorerLink = getExplorerLink(
        "transaction",
        transactionSignature,
        "devnet"
    )
    console.log(`✅ Burn Transaction: ${explorerLink}`);


} catch(error){
    console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
}

//https://explorer.solana.com/tx/2Dq5vhyxD18NbSxf56YhsDR59j7D6SssMmxPJRGGuvq9t5nEtMA8ghN6gFqiLeE6oLzaqPxzuCEc4uMLAV5NKbvW?cluster=devnet