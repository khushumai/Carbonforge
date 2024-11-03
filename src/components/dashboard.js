import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Navbar from './navbar';
import Footer from './footer';
import MintNFT from './mintNFT'; // Import the MintNFT component
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [showSignUpOptions, setShowSignUpOptions] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [mintedNFTs, setMintedNFTs] = useState([]); // Store minted NFTs
    const [showMintUI, setShowMintUI] = useState(false); // Toggle minting UI

    // Check authentication state
    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                }
            } else {
                setUser(null);
            }
        });
    }, []);

    // Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                setShowSignUpOptions(true);
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    // Email/Password Sign-Up
    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: user.email,
                createdAt: new Date(),
            });
            setShowSignUpOptions(true);
        } catch (error) {
            setError('Error creating account. Please try again.');
            console.error('Email sign-up error:', error);
        }
    };

    // Email/Password Sign-In
    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
            } else {
                setError('User not found. Please sign up.');
            }
        } catch (error) {
            setError('Incorrect email or password.');
            console.error('Email sign-in error:', error);
        }
    };

    // Sign-Out
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            setEmail('');
            setPassword('');
            setName('');
            setConfirmPassword('');
        });
    };

    // Callback function to handle newly minted NFTs
    const handleMintedNFT = (nftURI) => {
        setMintedNFTs([...mintedNFTs, nftURI]);
        setShowMintUI(false); // Close mint UI after minting
    };

    // Chart data (replace this with actual data if available)
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Carbon Offsets',
                data: [10, 20, 30, 40, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const navigate = useNavigate();


    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // If user is not signed in, show sign-in/sign-up options
    if (!user) {
        return (
            <div className="min-h-screen bg-[#faf6f2]">
                <Navbar />
                <h2 className="p-6 text-left text-5xl font-semibold font-custom text-[#73cd12]">Become a part of <span className="font-semibold text-[#a98b1c]">sustainability.</span></h2>
                <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] my-6 text-[#a96b1c]"></div>
                <div className="grid grid-cols-2">
                    <div>
                        <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn} className="border-2 border-[#76410a] rounded-lg w-[40vw] min-h-[40vw] ml-auto p-4 my-10">
                            <div className="text-5xl font-custom text-[#76410a]">Carbonforge</div>
                            <div className="font-vidaloka text-[#76410a] mb-10">Access your dashboard</div>

                            {isSignUp && (
                                <div>
                                    <input
                                        className="border-b-2 py-1 w-full border-[#76410a] text-center mb-3 font-custom"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <input
                                    className="text-center mb-4 py-1 w-full border-b-2 border-[#76410a] font-custom "
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full py-1 text-center mb-4 border-b-2 border-[#76410a] font-custom"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            {isSignUp && (
                                <div>
                                    <input
                                        className="border-b-2 border-[#76410a] py-1 w-full font-custom text-center mb-3 "
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            )}
                            <button className="bg-[#73cd12] w-1/2 px-3 py-1 rounded-lg text-white font-custom mt-10" type="submit">
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </button>
                            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                            <div className="flex jusify-center items-center mx-auto space-x-8 mt-4">
                                <div className="w-2/5 h-1 bg-[#76410a]"></div>
                                <div className="text-[#76410a] font-custom"> or </div>
                                <div className="w-2/5 h-1 bg-[#76410a]"></div>
                            </div>

                            <div className="flex flex-col mx-auto">
                                <button className="flex items-center justify-center mt-4 mr-4 bg-[#b69e7e] px-3 py-1 rounded-lg text-[#76410a] font-vidaloka" onClick={handleGoogleSignIn}>
                                    <FontAwesomeIcon icon={faGoogle} className="text-[#76410a]" style={{ marginRight: '8px' }} />
                                    Sign in with Google
                                </button>
                                <button onClick={() => setIsSignUp(!isSignUp)} className="block mx-auto mt-4 border-2 border-[#76410a] text-[#76410a] rounded-lg px-3 py-1 font-vidaloka">
                                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-[40vw] w-[40vw] rounded-lg border-2 border-[#76410a] p-4 m-10 bg-[#e7bb6c]/40">
                        <div>
                            <h3 className="font-custom text-5xl">Buyers</h3>
                            <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] mb-6 text-[#a96b1c]"></div>
                            <ul className="list-disc pl-4 text-left ml-4 font-vidaloka">
                                <li>Transparent transactions on blockchain</li>
                                <li>Direct access to verified credits</li>
                                <li>Lower fees, no middlemen</li>
                                <li>Proof of ownership with NFTs</li>
                                <li>Real-time credit verification</li>
                                <li>Flexible bidding options</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-custom text-5xl">Sellers</h3>
                            <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] mb-6 text-[#a96b1c]"></div>
                            <ul className="list-disc pl-4 text-left font-vidaloka">
                                <li>Global reach to buyers</li>
                                <li>Reduced transaction fees</li>
                                <li>Instant credibility through blockchain</li>
                                <li>Control over pricing</li>
                                <li>Fast, direct settlements</li>
                                <li>Secure, tokenized ownership</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        );
    }

    // Display dashboard content for signed-in users
    return (
        <div className="min-h-screen bg-[#faf6f2]">
            <Navbar />
            <h2 className="p-6 text-left text-5xl font-semibold font-custom text-[#73cd12]">Welcome <span className="text-[#a96b1c]"> Onboard!</span></h2>
            <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] my-6 text-[#a96b1c]"></div>
            <div className="text-7xl font-custom text-[#73cd12]">Global <span className="text-[#a96b1c]">Impact</span></div>
            <div><img src="/images/dashboard.png" className="mx-auto"></img></div>
            <div className="text-2xl font-vidaloka text-[#a96b1c] my-4">Together, Let's Make Every Trade a Step Towards a Sustainable Future!</div>
            <div className="flex mx-auto justify-center items-center space-x-32 mb-10">
                <button className="py-1 px-3 bg-[#73cd12] text-white font-custom text-2xl"
                    onClick={() => navigate('/user')}
                >
                    Go to Dashboard
                </button>
                <button className="py-1 px-3 bg-[#a96b1c] text-white font-custom text-2xl"
                    onClick={() => navigate('/')}
                >
                    Return to Home
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
