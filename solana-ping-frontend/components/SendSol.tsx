import { FC, useState } from 'react';
import styles from '../styles/PingButton.module.css';
import { PublicKey, Transaction, Connection, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const SendSol: FC = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = async () => {
        if (!publicKey || !recipient) {
            console.error("Please connect your wallet and provide a recipient address");
            return;
        }

        try {
            const toPubKey = new PublicKey(recipient);
            const transaction = new Transaction();
            const LAMPORTS_TO_SEND = Number(amount) * LAMPORTS_PER_SOL;

            const sendSolInstruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: toPubKey,
                lamports: LAMPORTS_TO_SEND,
            });

            transaction.add(sendSolInstruction);
            const signature = await sendTransaction(transaction, connection);
            console.log(`Transaction sent with signature: ${signature}`);
            
            // Wait for confirmation
            await connection.confirmTransaction(signature, 'processed');
            console.log(`Transaction confirmed: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Amount in SOL to send</h2>
            <input 
                type="number" 
                placeholder="Enter amount in SOL" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className={styles.buttonContainer} 
            />
            <h2>Send SOL to</h2>
            <input 
                type="text" 
                placeholder="Enter ID to send to" 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)} 
                className={styles.buttonContainer} 
            />
            <button className={styles.button} onClick={onClick}>Send Sol</button>
        </div>
    );
};
