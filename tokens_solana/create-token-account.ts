import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import dotenv from "dotenv"
dotenv.config();
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const tokenMintAccount = new PublicKey("DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV") //metadata address

const recipient = user.publicKey;
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
)

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet",
);

console.log(`✅ Created token Account: ${link}`);
console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

//address of token account : AbydrJGyHGAF4JjTbouWFoksganph2xR96sGYpf2icb1

