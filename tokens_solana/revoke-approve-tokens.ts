import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { revoke, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { publicKey } from "@metaplex-foundation/umi/serializers";

const DEVNET_URL = clusterApiUrl("devnet")
const TOKEN_MINT_ADDRESS  = "DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV" //metadata address
const connection = new Connection(DEVNET_URL)
const user = getKeypairFromEnvironment("SECRET_KEY")
console.log(`🔑 Loaded keypair. Public key: ${user.publicKey.toBase58()}`);

try{
    const tokenMintAddress = new PublicKey(TOKEN_MINT_ADDRESS)
    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAddress,
        user.publicKey
    )

    const revokeTransactionSignature = await revoke(
        connection,
        user,
        userTokenAccount.address,
        user.publicKey
    );
    const explorerLink = getExplorerLink(
        "transaction",
        revokeTransactionSignature,
        "devnet"
    )
    console.log(`✅ Revoke Delegate Transaction: ${explorerLink}`);
}   catch(error){
    console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
}
//https://explorer.solana.com/tx/hyKfJ3qgxioq4iWUqrv38cYHX5ydwP7LpzFwS6nbJGEyBCm62CxnzvmaKk9fYE3JKWBCJYCBVG9XpV689XU2T6n?cluster=devnet