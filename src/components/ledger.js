// ledger.js

import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import SHA256 from 'crypto-js/sha256';

const ledgerCollection = collection(db, 'ledger');

export const addTransactionToLedger = async (transaction) => {
    // Get the latest block to get the previous hash
    const q = query(ledgerCollection, orderBy('timestamp', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    let previousHash = '0'; // Genesis block
    if (!querySnapshot.empty) {
        const lastBlock = querySnapshot.docs[0].data();
        previousHash = lastBlock.hash;
    }

    const blockData = {
        ...transaction,
        timestamp: new Date().toISOString(),
        previousHash,
    };

    const blockString = JSON.stringify(blockData);
    const hash = SHA256(blockString).toString();

    // Add hash to block
    const blockWithHash = { ...blockData, hash };

    // Add block to ledger
    await addDoc(ledgerCollection, blockWithHash);
};

export const getLedger = async () => {
    const q = query(ledgerCollection, orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};
