import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
const publicKey = new PublicKey("F3a96EKq3SXHaqrCgF1AcGkB78MhhwmmcgAU9VSYCsXp") //public key of the account
const lenpub = publicKey.toBase58().length; 
// to handle invalid wallet addresses
if(lenpub!==44 || !publicKey){
    console.log("Invalid public key");}

//connecting to devnet
let connection = new Connection("https://api.devnet.solana.com","confirmed");

//connecting to mainnet
// const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed");
const balanceinlampots = await connection.getBalance(publicKey);
const balance = balanceinlampots/LAMPORTS_PER_SOL;
console.log(`
    balance for account ${publicKey} is ${balance} SOL`
);