import React, { useState } from 'react';
import { projectsData } from './projectsdata';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CarbonProjectsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const prevCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
        );
    };

    const nextCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative w-full h-auto flex bg-[#faf6f2] p-4 mt-6 py-20">
            {/* Left Section with Cards */}
            <div className="w-[60%] flex justify-center items-center relative">
                {/* Previous Card */}
                <div
                    className="absolute left-1 opacity-80 transform transition-all duration-300"
                    style={{
                        width: '200px',
                        height: '300px',
                        backgroundImage: `url(${projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="w-full h-full bg-black/50 shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
                        <div className="text-center mt-2">
                            <h3 className="font-bold text-white font-custom text-lg">
                                {projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length].title}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Center Card (Highlighted) */}
                <div
                    className="w-[300px] h-[400px] rounded-lg flex flex-col items-center justify-center p-4 z-10 transform scale-105 transition-all duration-300 cursor-pointer"
                    onClick={openModal}
                    style={{
                        backgroundImage: `url(${projectsData[currentIndex].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="text-center mt-auto mb-2">
                        <h3 className="font-bold text-white font-custom text-3xl">{projectsData[currentIndex].title}</h3>
                    </div>
                </div>

                {/* Next Card */}
                <div
                    className="absolute right-1 opacity-80 transform  transition-all duration-300"
                    style={{
                        width: '200px',
                        height: '300px',
                        backgroundImage: `url(${projectsData[(currentIndex + 1) % projectsData.length].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="w-full h-full bg-black/50 shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
                        <div className="text-center mt-2">
                            <h3 className="font-bold text-white font-custom text-lg">
                                {projectsData[(currentIndex + 1) % projectsData.length].title}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section with Text and Arrows */}
            <div className="w-[40%] flex flex-col items-center justify-center text-gray-800 mx-auto">
                <h2 className="text-5xl font-semibold mb-4 font-custom text-[#a96b1c] text-center">
                    Explore <span className="text-[#73cd12]">Carbon</span> Projects
                </h2>
                <div className="flex space-x-4 ">
                    <button onClick={prevCard} className="p-4 rounded-full bg-black/80 text-white hover:bg-[#a96b1c] text-4xl">
                        <FaArrowLeft />
                    </button>
                    <button onClick={nextCard} className="p-4 rounded-full bg-black/80 text-white hover:bg-[#a96b1c] text-4xl">
                        <FaArrowRight />
                    </button>
                </div>

                <Link to="/dashboard" className="bg-[#73cd12] px-2 py-1 text-3xl font-custom text-white mt-4"> Dashboard </Link>
            </div>

            {/* Modal for Project Details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto">
                        <button
                            className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        {/* Render ProjectDetails with IPFS data */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarbonProjectsCarousel;
