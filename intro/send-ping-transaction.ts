import * as web3 from "@solana/web3.js"
import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY")
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1*web3.LAMPORTS_PER_SOL,
    0.5*web3.LAMPORTS_PER_SOL,
);

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS =
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";


let transaction = new web3.Transaction();
const programId  = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingprogramdataid = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
    keys:[
        {
            pubkey: pingprogramdataid,
            isSigner: false,
            isWritable: true
        },
    ],
    programId,
});

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer],
);

console.log(`✅ Transaction completed! Signature is ${signature}`);