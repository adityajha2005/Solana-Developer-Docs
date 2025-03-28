import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

//spl token mint (token creator)
async function buildCreateMintTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    decimals: number,
    ): Promise<web3.Transaction> {
        const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
        const accountKeypair = web3.Keypair.generate();
        const programId = token.TOKEN_PROGRAM_ID;

        const transaction = new web3.Transaction().add(
            //creating new account for mint
            web3.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey : accountKeypair.publicKey,
                space : token.MINT_SIZE, //allocating space for minting
                lamports,
                programId,
            }),
            //sets up mint authority i.e who can create new tokens
            //sets the freeze authority i.e who can freeze the token
            token.createInitializeMintInstruction(
                accountKeypair.publicKey,
                decimals,
                payer,
                payer,
                programId,
            ),
        );
        return transaction;

    }

async function buildCreateTokenAccountTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    mint: web3.PublicKey,
    ): Promise<web3.Transaction>{
        const mintState = await token.getMint(connection,mint);
        const accountKeypair = await web3.Keypair.generate();
        const space = token.getAccountLenForMint(mintState);
        const lamports = await connection.getMinimumBalanceForRentExemption(space);
        const programId = token.TOKEN_PROGRAM_ID;

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: accountKeypair.publicKey,
                space,
                lamports,
                programId,
            }),
            token.createInitializeAccountInstruction(
                accountKeypair.publicKey,
                mint,
                payer,
                programId,
            )
        );
        return transaction;
    }