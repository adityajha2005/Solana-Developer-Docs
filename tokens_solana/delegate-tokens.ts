import dotenv from "dotenv"
dotenv.config()
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers"
import { Connection, PublicKey, clusterApiUrl, SystemProgram } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount, approve } from "@solana/spl-token"

const DEVNET_URL = clusterApiUrl("devnet")
const TOKEN_DECIMALS = 2;
const DELEGRATE_AMOUNT = 50;
const MINOR_UNITS_PER_MAJOR_UNITS = 10 ** TOKEN_DECIMALS; // 1 token = 100 minor units

const connection = new Connection(DEVNET_URL)
const user = getKeypairFromEnvironment("SECRET_KEY")
console.log(`🔑 Loaded keypair. Public key: ${user.publicKey.toBase58()}`);

const delegatePublicKey = new PublicKey(SystemProgram.programId);
const tokenMintAddress = new PublicKey("DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV") //metadata address

try{
    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAddress,
        user.publicKey,
    )
    const approveTransactionSignature = await approve(
        connection,
        user,
        userTokenAccount.address,
        delegatePublicKey,
        user.publicKey,
        DELEGRATE_AMOUNT * MINOR_UNITS_PER_MAJOR_UNITS, // 50 tokens
    )

    const explorerLink = getExplorerLink(
        "transaction",
        approveTransactionSignature,
        "devnet",
    )
    console.log(`✅ Delegate approved. Transaction: ${explorerLink}`);

} catch(error){
    console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
}

//https://explorer.solana.com/tx/WfBxvUUoPaBnBd2Cv7TF6FvDamUvzvgMagQfwx3UA3g2MFdwvbJL5WUkPbAFLf7md1yMXJMKADz85hVxvwQf48c?cluster=devnet