import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Loaded keypair from environment: ${user.publicKey.toBase58()}`);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey("DXDFqNVD8zQ7HCgEZ9T8S1ke9i8XgJEMH7rFyrvJCyAV");

const metadataData = {
    name: "RCB",
    symbol: "IPL",
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
    },
    {
        createMetadataAccountArgsV3: {
            data: metadataData,
            isMutable: true,
            collectionDetails: null
        }
    }
);

const transaction = new Transaction().add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}`);

const tokenMintLink = getExplorerLink(
    "address", 
    tokenMintAccount.toString(),
    "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}`);

