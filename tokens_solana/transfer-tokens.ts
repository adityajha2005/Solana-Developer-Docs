import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const connection = new Connection(clusterApiUrl("devnet"))
const sender = getKeypairFromEnvironment("SECRET_KEY")
console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`,
  );

const recipient = new PublicKey("EYw7EVxT1yrCAzSWHc6pr9mZfCjKFU9i4m2buAecVQQT") //2nd account
const tokenMintAccount = new PublicKey("DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV") //metadata address

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

//source token accnt to store token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey
)

//destination token accnt to store token
const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
)

//transfer tokens
const signature = await transfer(
    connection,
    sender,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    1 * MINOR_UNITS_PER_MAJOR_UNITS, // 1 token
);

const explorerLink = getExplorerLink(
    "transaction",signature,"devnet"

)
console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}`);

//💸 Attempting to send 1 token to EYw7EVxT1yrCAzSWHc6pr9mZfCjKFU9i4m2buAecVQQT...
//✅ Transaction confirmed, explorer link is: 
// https://explorer.solana.com/tx/47TrcvSgBXX111UMhcLaLsBAS8VntUVedc5bWUMn5WXyzfyQiweu612EBE1SFcJF7mCrxksqwUd1zbK2QQDXFFYu?cluster=devnet
