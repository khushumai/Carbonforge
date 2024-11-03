import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { projectsData } from './projectsdata';


function About() {
    return (
        <div className="min-h-screen bg-[#faf6f2]">
            <Navbar />
            <div className="p-6 text-left text-5xl font-semibold font-custom text-[#73cd12]">About <span className="font-thin text-[#a96b1c]">Us.</span></div>
            <div className="flex space-x-4 px-6 text-xs font-custom">
                <div className="bg-[#bf9b66] rounded-3xl px-3 py-1 border-2 border-[#76410a]">Carbon Bidding</div>
                <div className="bg-[#bf9b66] rounded-3xl px-3 py-1 border-2 border-[#76410a]">Offset Exchange</div>
                <div className="bg-[#bf9b66] rounded-3xl px-3 py-1 border-2 border-[#76410a]">Emissions Control</div>
            </div>
            <div className="w-[95%] mx-auto h-[4px] bg-[#76410a] my-6 text-[#a96b1c]"></div>
            <div className="flex px-6 font-vidaloka text-[#a96b1c]">
                <img src="/images/about.png" className="w-[100vw] h-[80vh] object-cover"></img>
                <div className="flex-col space-y-4 ml-4 my-auto text-left w-[90vw]">
                    <div>Welcome to CarbonForge, where innovation meets sustainability. Our platform empowers businesses to navigate the voluntary carbon markets, enabling the buying and selling of carbon credits with unprecedented transparency and security. </div>
                    <div>At CarbonForge, we believe that every transaction has the potential to make a positive impact on our planet. By leveraging advanced blockchain technology, we ensure that each step of the trading process is not only secure but also transparent. This innovative approach builds trust and confidence among our users, fostering a community dedicated to environmental stewardship.</div>
                    <div>Our platform offers a unique blend of options for carbon credit transactions, including both bidding and spot trading. This flexibility allows businesses to engage in carbon markets in a way that best suits their needs, maximizing their contributions to sustainability while optimizing their investments.</div>
                </div>
            </div>
            <div className="text-left p-6 font-vidaloka text-[#a96b1c]">
                Inspired by the steampunk aesthetic, CarbonForge combines a sense of adventure with a commitment to environmental progress. Our design reflects the creativity and innovation needed to tackle the pressing challenges of climate change.
            </div>
            <div className="text-left px-6 pb-10 font-vidaloka text-[#a96b1c]">Join us on this journey to forge a sustainable future. Together, we can transform the way businesses approach carbon management and create lasting positive impacts on the environment. At CarbonForge, your actions today shape a greener tomorrow.</div>

            <Footer />


        </div>
    );
}

export default About;