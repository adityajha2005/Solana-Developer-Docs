import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config();

// Get recipient's public key from command line arguments
const suppliedToPubKey = process.argv[2]||null;

if(!suppliedToPubKey){
    console.log("Please provide a public key to transfer to");
    process.exit(1);
}

//sender's keypair from environment variables
const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");
console.log(`supplied to public key : ${suppliedToPubKey}`)
const toPubKey = new PublicKey(suppliedToPubKey);

const connection = new Connection("https://api.devnet.solana.com","confirmed");
console.log("loaded the keypair, the destination public key, and connected to devnet");

const transaction = new Transaction();
//Amount to send in lamports (1 SOL = 1,000,000,000 lamports)
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND,
});
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection,transaction,[
    senderKeyPair,
])
console.log(`sent ${LAMPORTS_TO_SEND} lamports to ${toPubKey.toBase58()} with signature ${signature}`);