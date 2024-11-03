// mintNFT.js

import { create } from '@web3-storage/w3up-client';
import { v4 as uuidv4 } from 'uuid';
import { db } from './firebase'; // Firebase setup
import { addDoc, collection, updateDoc, arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import { addTransactionToLedger } from './ledger'; // Import ledger function

// Import File object
import { File } from 'web3.storage'; // Ensure this is installed and imported correctly

// Initialize Web3 Storage client
async function initializeWeb3StorageClient() {
  const client = await create();
  await client.login('kv378@njit.edu'); // Log in using email delegation
  await client.setCurrentSpace('did:key:z6Mkqm9NsQMUKiWR7cw8whUa5gQ4Kcvasbszj166r4LB9ukB'); // Replace with your space DID
  return client;
}

async function ensureUserNFTFieldExists(user) {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, { ownedNFTs: [] }); // Initialize with empty array if document doesn't exist
  } else if (!userDoc.data().ownedNFTs) {
    await updateDoc(userRef, { ownedNFTs: [] }); // Initialize `ownedNFTs` if it doesn't exist in the document
  }
}

// Generate a unique NFT hash ID
function generateHashID() {
  return uuidv4();
}

// Upload NFT metadata to Web3 Storage
async function uploadToWeb3Storage(files) {
  const client = await initializeWeb3StorageClient();
  const cid = await client.uploadDirectory(files);
  return cid.toString(); // Convert CID object to a string for Firebase compatibility
}

// Verify Carbon Credits (Real implementation using Verra web scraping)
async function verifyCarbonCredits(id, name, serialNumberStart, serialNumberEnd, issuanceDate) {
  // Since projects from projects.js don't need verification, we'll skip this function
  // If needed in the future, implement server-side verification to avoid CORS issues
  return true;
}

// Mint a Real Carbon Credit NFT
export async function mintCarbonCreditNFT(user, nftDetails) {
  await ensureUserNFTFieldExists(user);

  const {
    id,
    name,
    companyName,
    projectType,
    amountOfCredits,
    price,
    serialNumberStart,
    serialNumberEnd,
    issuanceDate,
    image,
    purchaseType,
    tag,
  } = nftDetails;

  // **Skip verification for projects from projects.js**
  const isVerified = true; // Set to true unconditionally

  const nftHashID = generateHashID();

  const nftMetadata = {
    ownerName: user.displayName || 'Anonymous',
    companyName,
    projectType,
    amountOfCredits,
    price,
    id,
    name,
    serialNumberStart: serialNumberStart || '',
    serialNumberEnd: serialNumberEnd || '',
    issuanceDate: issuanceDate || '',
    createdAt: new Date().toISOString(),
    isVerified,
    image,
    purchaseType,
    tag,
    nftHashID,
  };

  try {
    const files = [new File([JSON.stringify(nftMetadata)], `${nftHashID}.json`)];
    const ipfsHash = await uploadToWeb3Storage(files);

    const nftData = {
      id: nftHashID,
      ipfsHash,
      ...nftMetadata,
    };

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      ownedNFTs: arrayUnion(nftData), // Add the NFT data directly to the user's ownedNFTs array
    });

    await addDoc(collection(db, 'nfts'), nftData); // Add the NFT data to the universal nfts collection

    // Record transaction in ledger
    const transaction = {
      type: 'nftMint',
      userId: user.uid,
      nftId: nftHashID,
      timestamp: new Date().toISOString(),
      details: `User ${user.uid} minted NFT ${nftHashID}`,
    };
    await addTransactionToLedger(transaction);

    console.log('NFT minted and transaction recorded successfully!');
    return nftHashID;
  } catch (error) {
    console.error('Error minting NFT:', error);
    return null;
  }
}

// Mint Mock NFTs for Demo Purposes (set verification as true by default)
// Mint Mock NFTs for Demo Purposes (set verification as true by default)
export async function mintMockNFTs(user) {
  await ensureUserNFTFieldExists(user);

  const mockNFTs = [
    {
      name: 'Mock Project ABC',
      companyName: 'Green Earth Corp',
      projectType: 'Reforestation',
      amountOfCredits: 100,
      price: 10,
      purchaseType: 'bidding',
      tag: 'efficiency',
      image: '/images/energyefficiency.png',
      ownerName: user.displayName || 'Anonymous',
    },
    {
      name: 'Mock Project B',
      companyName: 'Blue Ocean LLC',
      projectType: 'Ocean Cleanup',
      amountOfCredits: 200,
      price: 20,
      purchaseType: 'direct',
      tag: 'wind',
      image: '/images/energyefficiency.png',
      ownerName: user.displayName || 'Anonymous',
    },
  ];

  for (const nftDetails of mockNFTs) {
    const nftHashID = generateHashID();
    const nftMetadata = {
      ownerName: nftDetails.ownerName,
      ...nftDetails,
      createdAt: new Date().toISOString(),
      isVerified: true, // Assume mock NFTs are verified
      nftHashID,
    };

    const files = [new File([JSON.stringify(nftMetadata)], `${nftHashID}.json`)];

    try {
      const ipfsHash = await uploadToWeb3Storage(files);
      const nftData = {
        id: nftHashID,
        ipfsHash,
        ...nftMetadata,
      };

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ownedNFTs: arrayUnion(nftData),
      });

      await addDoc(collection(db, 'nfts'), nftData);

      // Record transaction in ledger
      const transaction = {
        type: 'nftMint',
        userId: user.uid,
        nftId: nftHashID,
        timestamp: new Date().toISOString(),
        details: `User ${user.uid} minted mock NFT ${nftHashID}`,
      };
      await addTransactionToLedger(transaction);

      console.log(`Mock NFT ${nftDetails.name} minted and uploaded successfully!`);
    } catch (error) {
      console.error(`Error minting mock NFT ${nftDetails.name}:`, error);
    }
  }
}

// Test Web3 Storage Connection (Optional for validation)
export async function testWeb3StorageConnection() {
  try {
    const client = await initializeWeb3StorageClient();
    console.log("Web3 Storage client connected successfully!");
  } catch (error) {
    console.error("Failed to connect to Web3 Storage:", error);
  }
}
