// projects.js

import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { projectsData } from './projectsdata';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';

import { mintCarbonCreditNFT } from './mintNFT'; // Import your existing minting function
import { addTransactionToLedger } from './ledger'; // Import ledger function

function Projects() {
    const [selectedTag, setSelectedTag] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null); // Store selected project for bidding or direct buy
    const [bidAmount, setBidAmount] = useState(""); // Store bid amount
    const [purchaseQuantity, setPurchaseQuantity] = useState(1); // Store selected quantity
    const [user, setUser] = useState(null); // Track user authentication
    const [error, setError] = useState(""); // Error message for bid quantity
    const [isProcessing, setIsProcessing] = useState(false); // Track processing state

    // Get unique tags from project data
    const tags = ["All", ...new Set(projectsData.map(project => project.tag))];

    // Filter projects based on selected tag
    const filteredProjects = selectedTag === "All"
        ? projectsData
        : projectsData.filter(project => project.tag === selectedTag);

    // Check authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Open modal for placing a bid or purchasing
    const openBidModal = (project) => {
        setSelectedProject(project);
        setError(""); // Reset error when modal opens
    };

    // Close modal
    const closeBidModal = () => {
        setSelectedProject(null);
        setBidAmount("");
        setPurchaseQuantity(1); // Reset quantity
        setIsProcessing(false);
    };

    // Handle bid submission
    const placeBid = async () => {
        if (bidAmount && !isNaN(bidAmount)) {
            // Add bid to project data
            selectedProject.bids.push({
                bidderId: user.uid,
                amount: parseFloat(bidAmount),
                quantity: purchaseQuantity,
                timestamp: new Date().toISOString()
            });
            // Record transaction to ledger
            const transaction = {
                type: 'bid',
                userId: user.uid,
                projectId: selectedProject.id,
                amount: parseFloat(bidAmount),
                quantity: purchaseQuantity,
                timestamp: new Date().toISOString(),
                details: `Bid of ${bidAmount} placed by user ${user.uid} on project ${selectedProject.title}`
            };
            try {
                await addTransactionToLedger(transaction);
                closeBidModal();
                alert(`Bid of ${bidAmount} placed successfully on ${selectedProject.title}`);
            } catch (error) {
                console.error('Error adding transaction to ledger:', error);
                alert('Failed to record transaction. Please try again.');
            }
        } else {
            alert("Please enter a valid bid amount");
        }
    };

    // Handle direct purchase without actual payment processing
    const handleDirectPurchase = async () => {
        setIsProcessing(true);
        const totalPrice = (selectedProject.basePrice / selectedProject.quantity) * purchaseQuantity;

        try {
            // Mint NFT using your existing function
            const nftDetails = {
                id: selectedProject.id,
                name: selectedProject.title,
                companyName: selectedProject.owner,
                projectType: selectedProject.tag,
                amountOfCredits: purchaseQuantity,
                price: totalPrice,
                serialNumberStart: 'SOME_SERIAL_START', // Provide actual data if available
                serialNumberEnd: 'SOME_SERIAL_END', // Provide actual data if available
                issuanceDate: new Date().toISOString(), // Use actual issuance date if available
                image: selectedProject.image,
                purchaseType: selectedProject.purchaseType,
                tag: selectedProject.tag,
            };

            const nftHashID = await mintCarbonCreditNFT(user, nftDetails);
            if (!nftHashID) {
                throw new Error('NFT minting failed');
            }

            // Record transaction to ledger
            const transaction = {
                type: 'purchase',
                userId: user.uid,
                projectId: selectedProject.id,
                amount: totalPrice,
                quantity: purchaseQuantity,
                timestamp: new Date().toISOString(),
                details: `Purchase of ${purchaseQuantity} tokens of project ${selectedProject.title} by user ${user.uid}`,
            };
            await addTransactionToLedger(transaction);

            // Update project quantity
            selectedProject.quantity -= purchaseQuantity;

            closeBidModal();
            alert(`Purchased ${purchaseQuantity} units of ${selectedProject.title} at ${totalPrice} each.`);
        } catch (error) {
            console.error('Error processing purchase:', error);
            alert('Failed to process purchase. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Close modal if clicking outside of it
    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            closeBidModal();
        }
    };

    // Validate quantity for bidding
    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        if (quantity > selectedProject.quantity) {
            setError(`Quantity cannot exceed available amount (${selectedProject.quantity}).`);
        } else {
            setError("");
        }
        setPurchaseQuantity(quantity);
    };

    return (
        <div className="w-screen min-h-screen bg-[#faf6f2]">
            <Navbar />

            {/* Title */}
            <div className="text-left text-5xl font-semibold text-[#73cd12] my-5 ml-[5%] font-custom">
                Carbon <span className="font-light text-[#a96b1c]">Offset Projects.</span>
            </div>

            {/* Tag Filter Section */}
            <div className="flex justify-start space-x-4 mb-8 ml-[5%]">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={`px-3 py-1 rounded-3xl text-sm font-custom border-2 border-[#76410a] bg-[#bf9b66] text-black ${selectedTag === tag ? "border-4" : ""
                            }`}
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] my-6 text-[#a96b1c]"></div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 gap-4 mb-16">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="shadow-lg p-2 flex flex-col justify-end bg-cover bg-center h-[70vh]"
                        style={{
                            backgroundImage: `url(${project.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Project Name */}
                        <h3 className="text-3xl font-custom font-bold text-white mb-2 text-left">{project.title}</h3>

                        {/* Project Details */}
                        <p className="text-5xl font-thin text-white text-left">
                            {project.basePrice}
                        </p>
                        <p className="text-lg text-white text-left font-custom"> {project.purchaseType}</p>
                        <p className="text-lg text-white text-left font-vidaloka">Quantity Available: {project.quantity}</p>

                        {/* Place Bid Button (Always visible) */}
                        <button
                            className="mt-4 px-4 py-2 bg-[#73cd12] text-white rounded-lg hover:bg-[#73cd12]/80 font-custom"
                            onClick={() => openBidModal(project)}
                        >
                            {project.purchaseType === "bidding" ? "Place Bid" : "Direct Order"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Bid/Direct Purchase Modal */}
            {selectedProject && (
                <div
                    id="modal-overlay"
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
                    onClick={handleOutsideClick}
                >
                    <div className="relative bg-[#faf6f2] p-6 h-[90vh] w-[80vw] rounded-lg shadow-lg border-[#76310a] border-4">
                        {/* Close Button */}
                        <button
                            onClick={closeBidModal}
                            className="absolute top-4 right-4 text-[#73cd12] text-2xl"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="text-3xl font-custom text-left text-[#a96b1c] font-bold mb-4">{selectedProject.title}</h3>
                        <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] my-6 text-[#a96b1c]"></div>
                        <div className="flex object-contain h-[80%]">
                            <img src={selectedProject.image} alt={selectedProject.title} className="w-1/2" />
                            <div className="w-full ml-4 h-full flex flex-col justify-between">
                                <h1 className="text-3xl text-left font-custom text-[#a96b1c]">Overview</h1>
                                <p className="text-base font-vidaloka text-left text-[#a96b1c]">{selectedProject.details}</p>
                                <h1 className="text-left font-extralight text-5xl text-[#73cd12]">{selectedProject.basePrice} <span className="text-xl font-vidaloka text-[#a96b1c]">Base Price</span></h1>
                                <h1 className="text-left text-2xl font-custom text-[#a96b1c]">Project Verified By VCS</h1>
                                <h1 className="text-left text-xl font-vidaloka text-[#a96b1c]"> {selectedProject.quantity} tokens currently owned by <span className="text-[#73dc12] text-xl">{selectedProject.owner}</span></h1>

                                {/* Quantity Selection */}
                                <input
                                    type="number"
                                    min="1"
                                    max={selectedProject.quantity}
                                    value={purchaseQuantity}
                                    onChange={handleQuantityChange}
                                    placeholder="Enter quantity"
                                    className="w-1/2 p-2 border border-gray-300 rounded mb-4 mx-auto"
                                />
                                {error && <p className="text-red-500">{error}</p>}

                                {/* Conditional rendering based on purchase type */}
                                {user ? (
                                    selectedProject.purchaseType === "direct" || selectedProject.purchaseType === "both" ? (
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-2"
                                            onClick={handleDirectPurchase}
                                            disabled={error !== "" || isProcessing}
                                        >
                                            {isProcessing ? 'Processing...' : 'Direct Purchase'}
                                        </button>
                                    ) : null
                                ) : (
                                    <p className="mt-4 px-4 py-2 bg-[#bf9b66] text-white rounded-lg text-center font-custom">
                                        Please sign in to place bids
                                    </p>
                                )}

                                {user && (selectedProject.purchaseType === "bidding" || selectedProject.purchaseType === "both") && (
                                    <>
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder="Enter your bid amount"
                                            className="w-1/2 p-2 border border-gray-300 rounded mb-4 mx-auto"
                                        />
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700"
                                            onClick={placeBid}
                                            disabled={error !== ""}
                                        >
                                            Place Bid
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Projects;
