import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // Gear icon

function Navbar() {
  const location = useLocation();

  // Determine the correct className based on the current route
  const navClassName = location.pathname === "/"
    ? "flex items-center space-x-5 bg-white/20 border-[#a96b1c] border-2 backdrop-blur-3xl pr-6 rounded-[11px] h-10"
    : "flex items-center space-x-5 bg-[#e7bb6c]/40 border-[#a96b1c] border-2 backdrop-blur-3xl pr-6 rounded-[11px] h-10";

  return (
    <nav className="p-8 relative z-10 font-custom ">
      <div className="flex justify-between items-center  overflow-visible">
        <div className={navClassName}>
          <div className>
            <img src="/images/gear.gif" className="h-14 w-14 rounded-full overflow-hidden -translate-x-2"></img>
          </div>
          <Link to="/" className="text-[#371a00] hover:text-black/50 font-semibold">
            Home
          </Link>
          <Link to="/about" className="text-[#371a00] hover:text-black/50 font-semibold">
            About
          </Link>
          <Link to="/projects" className="text-[#371a00] hover:text-black/50 font-semibold">
            Explore Projects
          </Link>
          <Link to="/dashboard" className="text-[#371a00] hover:text-black/50 font-semibold">
            Dashboard
          </Link>
        </div>
        <div className="flex items-center space-x-1 ">
          <img className="w-16" src="/images/logo.png" alt="Carbonforge Logo" />
          <span className="text-black text-3xl font-thin">Carbonforge</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
