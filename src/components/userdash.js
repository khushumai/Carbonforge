// UserDash.js

import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { projectsData } from './projectsdata';
import { mintCarbonCreditNFT, mintMockNFTs } from './mintNFT';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const UserDash = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [randomProject, setRandomProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);
    const [error, setError] = useState("");
    const [mintedNFTs, setMintedNFTs] = useState([]);
    const [ownedNFTs, setOwnedNFTs] = useState([]); // State to store owned NFTs
    const [showMintUI, setShowMintUI] = useState(false);
    const [ledgerTransactions, setLedgerTransactions] = useState([]); // State to store ledger transactions

    const transactions = [
        { id: 1, transactionId: '0x123abc', amount: 50, type: 'Retirement', timestamp: '2024-04-25T10:30:00Z' },
        { id: 2, transactionId: '0x456def', amount: 30, type: 'Purchase', timestamp: '2024-04-24T14:20:00Z' },
        { id: 3, transactionId: '0x789ghi', amount: 20, type: 'Sale', timestamp: '2024-04-23T09:15:00Z' },
        { id: 4, transactionId: '0xabc123', amount: 40, type: 'Retirement', timestamp: '2024-04-22T16:45:00Z' },
    ];

    const pieData = {
        labels: ['Retired', 'Active', 'Pending'],
        datasets: [{ data: [400, 300, 300], backgroundColor: ['#73cd12', '#a96b1c', '#bf9b66'] }],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Retired Credits Distribution' } },
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{ label: 'Carbon Offset Credits (tons)', data: [15, 30, 25, 40, 50, 45], backgroundColor: 'rgba(115, 205, 18, 0.6)' }],
    };

    const barOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else navigate('/login');
        });
    }, [navigate]);

    useEffect(() => {
        if (projectsData.length > 0) {
            const randomIndex = Math.floor(Math.random() * projectsData.length);
            setRandomProject(projectsData[randomIndex]);
        }
    }, []);

    // Fetch owned NFTs from Firebase
    useEffect(() => {
        const fetchOwnedNFTs = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists() && userDoc.data().ownedNFTs) {
                    setOwnedNFTs(userDoc.data().ownedNFTs);
                }
            }
        };
        fetchOwnedNFTs();
    }, [user]);

    // Fetch ledger transactions from Firebase
    useEffect(() => {
        const fetchLedgerTransactions = async () => {
            try {
                const ledgerRef = collection(db, 'ledger');
                const ledgerSnapshot = await getDocs(ledgerRef);
                const transactionsData = ledgerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setLedgerTransactions(transactionsData);
            } catch (error) {
                console.error('Error fetching ledger transactions:', error);
            }
        };
        fetchLedgerTransactions();
    }, []);

    const handleMintMockNFTs = async () => {
        if (user) {
            await mintMockNFTs(user);
            alert('Mock NFTs minted successfully!');
        }
    };

    const handleMintRealNFT = async () => {
        const nftDetails = {
            id: 'exampleId123',
            name: 'Carbon Offset Project',
            companyName: 'EcoCorp',
            projectType: 'Reforestation',
            amountOfCredits: 100,
            price: 50,
            serialNumberStart: '12345',
            serialNumberEnd: '12350',
            issuanceDate: '2023-01-01',
        };

        if (user) {
            const nftId = await mintCarbonCreditNFT(user, nftDetails);
            if (nftId) {
                setMintedNFTs([...mintedNFTs, nftId]);
                alert(`Real NFT with ID ${nftId} minted successfully!`);
            } else {
                alert('Failed to mint real NFT.');
            }
        }
    };

    const openBidModal = (project) => {
        setSelectedProject(project);
        setError("");
    };

    const closeBidModal = () => {
        setSelectedProject(null);
        setBidAmount("");
        setPurchaseQuantity(1);
    };

    const placeBid = () => {
        if (bidAmount && !isNaN(bidAmount)) {
            closeBidModal();
            alert(`Bid of $${bidAmount} placed successfully on ${selectedProject.title}`);
        } else alert("Please enter a valid bid amount");
    };

    if (user === null) return <div className="flex justify-center items-center h-screen bg-[#faf6f2]"><p className="text-xl">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-[#faf6f2] flex flex-col">
            <div className="flex flex-1">
                {/* Left-side Navigation */}
                <aside className="w-1/4 bg-[#111214] py-6 px-3 flex flex-col items-start rounded-r-3xl border-r-8 border-[#76410a] h-screen sticky top-0">
                    <div className="flex justify-center items-center space-x-2 mb-8">
                        <img src="/images/logo.png" alt="Logo" className="w-[30%]" />
                        <div className="text-white font-custom text-3xl">Carbonforge</div>
                    </div>
                    <h2 className="text-white text-xl ml-4 my-4 font-custom">Main Menu</h2>
                    <nav className="space-y-4 w-full">
                        <button
                            className="text-white text-lg font-vidaloka px-4 py-2 rounded hover:bg-[#a96b1c]/60 w-full text-left"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </button>
                        <button
                            className="text-white text-lg font-vidaloka px-4 py-2 rounded hover:bg-[#a96b1c]/60 w-full text-left"
                            onClick={() => alert('Additional Feature Coming Soon')}
                        >
                            Transaction History
                        </button>
                        <button
                            className="text-white text-lg font-vidaloka px-4 py-2 rounded hover:bg-[#a96b1c]/60 w-full text-left"
                            onClick={() => auth.signOut().then(() => navigate('/dashboard'))}
                        >
                            Sign Out
                        </button>
                        <button
                            className="text-white text-lg font-vidaloka px-4 py-2 rounded hover:bg-[#a96b1c]/60 w-full text-left"
                            onClick={() => alert('Additional Feature Coming Soon')}
                        >
                            My Profile
                        </button>
                    </nav>
                    <img src="/images/gear.gif" className="rounded-full h-24 w-24 mx-auto my-auto" alt="Gear" />
                </aside>

                {/* Right-side Content */}
                <main className="w-3/4 p-10 overflow-y-auto">
                    <h2 className="text-5xl font-custom text-[#73cd12] mb-8">Carbon Dashboard</h2>

                    {/* Mint NFT Section */}
                    <div className="flex justify-center mb-10">
                        <button onClick={() => setShowMintUI(!showMintUI)} className="bg-green-500 text-white px-4 py-2 rounded-lg font-custom">
                            {showMintUI ? 'Close Mint UI' : 'Mint NFT'}
                        </button>
                        <button onClick={handleMintMockNFTs} className="bg-[#76410a] text-white px-4 py-2 rounded-lg font-custom ml-4">
                            Mint Mock NFTs
                        </button>
                    </div>
                    {showMintUI && (
                        <div className="p-6 border border-gray-300 rounded-lg mb-4 bg-white">
                            <button onClick={handleMintRealNFT} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-custom">
                                Mint Real NFT (Example Data)
                            </button>
                        </div>
                    )}

                    {/* Carbon Offset Bar Chart, Pie Chart, and Marketplace */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[50vh]">
                        <div className="bg-white p-6 rounded-lg shadow-md"><Bar data={barData} options={barOptions} /></div>
                        <div className="bg-white p-6 rounded-lg shadow-md"><Pie data={pieData} options={pieOptions} /></div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col cursor-pointer" onClick={() => navigate('/projects')}>
                            <h3 className="text-xs text-black/60 font-bold mb-4">Bid in Marketplace</h3>
                            {randomProject ? (
                                <div className="flex-1 bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${randomProject.image})` }}>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                                        <h4 className="text-xl font-bold font-custom text-left">{randomProject.title}</h4>
                                        <p className="font-thin text-5xl text-left">{randomProject.basePrice}</p>
                                    </div>
                                </div>
                            ) : <p>Loading...</p>}
                        </div>
                    </div>

                    {/* Owned NFTs List */}
                    <div className="p-6 text-lg font-vidaloka text-[#76410a]">
                        <h3 className="text-[#73cd12] text-3xl">Owned NFTs:</h3>
                        <ul>
                            {ownedNFTs.map((nft, index) => (
                                <li key={index}>
                                    <a href={`https://ipfs.io/ipfs/${nft.ipfsHash}`} target="_blank" rel="noopener noreferrer">
                                        {nft.name} - {nft.companyName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Carbon Ledger */}
                    <div className="p-6 text-lg font-vidaloka text-[#76410a]">
                        <h3 className="text-5xl mb-4 text-[#73cd12] font-custom">Carbon Ledger:</h3>
                        <ul>
                            {ledgerTransactions.map((transaction) => (
                                <li key={transaction.id}>
                                    {transaction.type} - {transaction.amount} Credits - {new Date(transaction.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                        {/* Hardcoded Transactions */}
                        <h3 className="mt-4">Sample Transactions:</h3>
                        <ul>
                            {transactions.map((transaction) => (
                                <li key={transaction.id}>
                                    {transaction.type} - {transaction.amount} Credits - {new Date(transaction.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-10 text-2xl font-vidaloka text-[#76410a]">Keep tracking your progress and make a sustainable impact!</div>
                </main>
            </div>
        </div>
    );
};

export default UserDash;
