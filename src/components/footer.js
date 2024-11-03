import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="bg-[#371a00]/80 rounded-t-3xl w-screen py-4 border-t-8 border-[#73cd12] ">
            {/* Main Text */}
            <div className="text-left ml-16 text-4xl font-semibold font-custom text-[#faf6f2] mb-6">
                Certified <span className="font-light text-[#73cd12]">Carbon </span>Credits.
            </div>
            <div className="px-10">
                <img src="/images/certifications.png" className="rounded-3xl"></img>

            </div>



            {/* Footer Links */}
            <div className="flex justify-center mt-8 space-x-8 text-[#73cd12] text-sm mb-4 font-extrabold">
                <Link to="/" className="hover:text-white">Home</Link>
                <Link to="/about" className="hover:text-white">About Us</Link>
                <Link to="/bids" className="hover:text-white">Bids</Link>
                <Link to="/projects" className="hover:text-white">Projects</Link>
            </div>
        </div>
    );
}

export default Footer;
