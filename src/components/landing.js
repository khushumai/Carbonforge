import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import CarbonProjectsCarousel from './landingprojects';
import { PiGearSixThin } from "react-icons/pi";


function Landing() {
    return (
        <div className="bg-[#faf6f2] min-h-screen">


            {/* hero section */}

            <div className="max-h-screen">
                <Navbar />
                <div
                    className="m-4 w-auto h-[90vh] bg-[#666565] -translate-y-28 rounded-2xl relative z-0"
                    style={{
                        clipPath: "polygon(0 0, 78% 0, 78% 12%, 100% 12%, 100% 100%, 35% 100%, 35% 65%, 0 65%)",
                        backgroundImage: `url('/images/landing.png')` // Fixing this part
                    }}
                >

                </div>
                <div className="text-[#a96b1c] text-left px-4 -translate-y-80 w-[36%] text-xl font-custom uppercase">
                    Offsetting should always be considered a last resort, as our primary focus is on reducing emissions within businesses and industries. However, if you find it necessary to offset, we are committed to offering only the most responsible and sustainable options available.
                </div>
            </div>


            {/* voluntary carbon market section */}

            <div className="max-h-screen mt-10">
                <div className="grid grid-cols-2">
                    <div className="mt-20">
                        <div className="flex items-center justify-start mb-4 ml-10">
                            <div className="h-11 w-11 mr-4 rounded-full overflow-hidden bg-[#a96b1c]">
                                <img src="/images/block.png" alt="Blockchain Icon" className="w-5 h-5 object-cover mx-auto mt-3" />
                            </div>
                            <div className="text-2xl font-vidaloka text-[#a96b1c]">Certified Blockchain Carbon Ledger System</div>
                        </div>
                        <div className="flex items-center justify-start mb-4 ml-10">
                            <div className="h-11 w-11 mr-4 rounded-full overflow-hidden bg-[#a96b1c]">
                                <img src="/images/trans.png" alt="Transparency Icon" className="w-7 h-5 object-cover mx-auto mt-3" />
                            </div>
                            <div className="text-2xl font-vidaloka text-[#a96b1c]">Higher Transparency & Traceability</div>
                        </div>
                        <div className="flex items-center justify-start mb-4 ml-10">
                            <div className="h-11 w-11 mr-4 rounded-full overflow-hidden bg-[#a96b1c]">
                                <img src="/images/biz.png" alt="Small Business Icon" className="w-5 h-5 object-cover mx-auto mt-3" />
                            </div>
                            <div className="text-2xl font-vidaloka text-[#a96b1c]">Small Business Friendly Platform</div>
                        </div>
                    </div>

                    <div>
                        <div className="px-3 text-4xl py-1 bg-[#b08443] text-black w-[54%] mx-auto mb-2 rounded-3xl font-custom">Why Carbonforge?</div>
                        <div className="ml-32">
                            <div className="text-6xl font-thin text-left mb-2 font-custom text-[#a96b1c]">Drive</div>
                            <div className="text-6xl font-semibold text-left mb-2 font-custom text-[#73cd12]">Sustainable</div>
                            <div className="text-6xl font-thin text-left font-custom text-[#a96b1c]">Change</div>
                        </div>
                    </div>
                </div>
                <div class="relative w-full h-[32vh] md:h-[40vh] lg:h-[48vh] bg-[#faf6f2] mt-10">
                    <div class="absolute left-0 bottom-[10%] w-[25%] border-b-4 border-[#e8ba6c] -translate-x-1 ">
                        <div class="h-28 w-36 border-l-4 rounded-tl-xl  border-t-4 border-[#e8ba6c] rounded-br-xl absolute left-full -translate-y-28 -translate-x-1"></div>
                    </div>

                    <div class="absolute right-0 top-[12%] w-[43.5%] h-24  border-t-4 border-l-4 rounded-tl-lg border-[#e8ba6c]"></div>

                    <div class="absolute top-[18%] left-[22%] text-2xl md:text-4xl lg:text-5xl font-normal text-[#a96b1c] font-custom">
                        Voluntary <span className="text-[#73cd12]">Carbon</span> <br /> Markets
                    </div>

                    <div class="absolute top-[16%] left-[5%] text-[#A96B1C]">
                        <PiGearSixThin class="w-4 h-4 md:w-5 md:h-5 lg:w-24 lg:h-24" />
                    </div>
                    <div class="absolute top-[10%] left-[52%] text-[#A96B1C]">
                        <PiGearSixThin class="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-8" />
                    </div>
                    <div class="absolute top-[35%] left-[15%] text-[#A96B1C]">
                        <PiGearSixThin class="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11" />
                    </div>
                    <div class="absolute top-[38%] left-[46%] text-[#A96B1C]">
                        <PiGearSixThin class="w-10 h-10 md:w-11 md:h-11 lg:w-16 lg:h-16" />
                    </div>
                    <div class="absolute top-[7%] left-[28%] text-[#A96B1C]">
                        <PiGearSixThin class="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" />
                    </div>
                    <div class="absolute top-0 left-[18%] text-[#A96B1C]">
                        <PiGearSixThin class="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" />
                    </div>
                    <div class="absolute top-[60%] left-[27%] text-[#A96B1C]">
                        <PiGearSixThin class="w-10 h-10 md:w-11 md:h-11 lg:w-20 lg:h-20" />
                    </div>
                    <div class="absolute top-[50%] left-[38%] text-[#A96B1C]">
                        <PiGearSixThin class="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-5 lg:h-5" />
                    </div>
                    <div class="absolute top-[20%] left-[58%] text-[#A96B1C]">
                        <PiGearSixThin class="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-10 lg:h-10" />
                    </div>
                    <div class="absolute top-[88%] left-[12%] text-[#A96B1C]">
                        <PiGearSixThin class="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-16 lg:h-16" />
                    </div>
                    <div class="absolute top-[34%] left-[63%] text-[#A96B1C]">
                        <PiGearSixThin class="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2" />
                    </div>
                    <div class="absolute top-[54%] left-[45%] text-[#A96B1C]">
                        <PiGearSixThin class="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2" />
                    </div>

                    <div class="absolute right-[5%] top-[58%] w-[40%] text-[#a96b1c] border-black font-vidaloka text-sm text-left">
                        Join the voluntary carbon market (VCM) to offset your emissions and enhance your sustainability efforts! By purchasing verified carbon credits, your business can exceed compliance requirements, attract eco-conscious consumers, and stand out in the marketplace. Our trading platform simplifies access to diverse offset projects, offering real-time pricing and transparent trading. Embrace the opportunity to invest in a sustainable future while positively impacting the planet—get started today!
                    </div>
                </div>

                {/* explore carbon projects section */}
                <CarbonProjectsCarousel />
                <Footer />
                {/* footer section gotta contain all certifications */}
            </div>
        </div>
    );
}

export default Landing;