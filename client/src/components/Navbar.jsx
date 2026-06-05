import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu } from "lucide-react";

export default function Navbar({ user }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 via-purple-400 to-lime-500 text-white shadow-md">
       <div className={`absolute top-0 right-0  bg-gray-700 z-10 transition-all duration-300 `}>
            <button className='mb-5' onClick={()=>{setDesktopOpen(!desktopOpen
      
      
      
      )}}><Menu/></button>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
        
        
        {/* Left side */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="Study Flow logo"
              className="h-16 w-16 rounded-full object-cover sm:h-11 sm:w-11"
            />
            <h1 className="text-lg font-bold tracking-wide sm:text-xl">
              Study Flow
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-2 text-sm font-semibold sm:text-base md:flex-row md:items-center md:gap-6">
          <Link
            to="/"
            className="rounded-md px-3 py-2 transition hover:bg-white/15"
          >
            Home
          </Link>

          <div className="rounded-md bg-white/10 px-3 py-2 text-center md:text-left">
            {user?.username ? user.username : "Guest"}
          </div>
        </div>
      </div>
    </nav>
  );
}