import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

function isValidPublicKey(publicKey: string): boolean {
    return publicKey.length === 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(publicKey);
}
// to handle invalid wallet addresses

async function checkBalance() {
    try {
        const publicKeyString = "F3a96EKq3SXHaqrCgF1AcGkB78MhhwmmcgAU9VSYCsXp";
        if(!isValidPublicKey(publicKeyString)){
            throw new Error("Invalid public key");
        }
        const publicKey = new PublicKey(publicKeyString);//converts into a proper Solana PublicKey object
        
        let connection = new Connection("https://api.devnet.solana.com","confirmed");
        const balanceinlampots = await connection.getBalance(publicKey);
        const balance = balanceinlampots/LAMPORTS_PER_SOL;
        console.log(`
         balance for account ${publicKey} is ${balance} SOL`);
    } catch (error) {
        console.error("Error checking balance:", error);
        process.exit(1);
    }
}





//for connecting to mainnet ,replace devnet with mainnet
// const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed");

checkBalance();