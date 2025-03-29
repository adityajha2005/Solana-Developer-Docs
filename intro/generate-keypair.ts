//creating keypair

import { Keypair } from "@solana/web3.js";
try {
    const keypair = Keypair.generate();
    console.log("✅ Keypair generated");
    console.log("Public key:",keypair.publicKey.toBase58());
    console.log("Private Key:",keypair.secretKey)
    console.log(`✅ Finished!`);
} catch (error) {
    console.error("❌ Error generating keypair:", error);
    process.exit(1);
}




//loading keypair frome env

// import dotenv from "dotenv";
// dotenv.config();
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";
// const keypair = getKeypairFromEnvironment("SECRET_KEY");
// console.log("✅ Keypair generated");