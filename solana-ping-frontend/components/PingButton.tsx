import { FC } from 'react';
import styles from '../styles/PingButton.module.css';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const PingButton: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"); // Replace with actual program ID
    const DATA_ACCOUNT_PUBKEY = new PublicKey("F3a96EKq3SXHaqrCgF1AcGkB78MhhwmmcgAU9VSYCsXp");

    const onClick = async () => {
        if (!connection || !publicKey) {
            console.error("Wallet isn't connected");
            return;
        }

        try {
            const transaction = new Transaction();
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash; // Ensure a valid blockhash
            transaction.feePayer = publicKey; // Set fee payer

            const instruction = new TransactionInstruction({
                keys: [
                    {
                        pubkey: DATA_ACCOUNT_PUBKEY,
                        isSigner: false,
                        isWritable: true,
                    },
                ],
                programId: PROGRAM_ID,
            });

            transaction.add(instruction);

            const signature = await sendTransaction(transaction, connection);
            console.log("Transaction signature:", signature);
        } catch (error) {
            console.error("Transaction failed", error);
        }
    };

    return (
        <div className={styles.buttonContainer} onClick={onClick}>
            <button className={styles.button}>Ping!</button>
        </div>
    );
};
