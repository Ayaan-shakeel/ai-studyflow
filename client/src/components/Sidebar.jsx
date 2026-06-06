import React, { useState } from "react";
import { BookOpen, CheckCircleIcon, Clock10Icon, LayoutDashboard, LogOut, Menu, NotebookTabs, X } from "lucide-react";
import { Link } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import toast from "react-hot-toast";

export default function Sidebar() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Notes", icon: <NotebookTabs size={20} />, path: "/notes" },
    { name: "Subjects", icon: <BookOpen size={20} />, path: "/subjects" },
    {name:"Tasks",icon:<CheckCircleIcon size={20}/>,path:"/tasks"},
    {name:"Study Timer",icon:<Clock10Icon size={20}/>,path:"/study-timer"}
  ];

   const handleLogout=()=>{
     console.log("btn clicked")
        localStorage.removeItem("token");
        window.location.href="/login";
        toast.success("Logged out successfully")
    }

  return (
    <>
    <Toaster position="top-right" reverse={false}/>
      {/* mobile topbar */}
      <div className="fixed top-0 left-0 font-semibold flex w-full items-center justify-between  mb-10 px-4 py-3  text-white  md:hidden">
        <div className="border-2 border-gray-400 rounded-2xl hover:bg-teal-50">

        <button onClick={() => setMobileMenu(true)} className="rounded-md p-2 hover:bg-gray-700">
          <Menu size={30} />
        </button>
        </div>
        {/* <h1 className="text-lg font-bold"></h1> */}
        <div className="w-9" />
      </div>

      {/* mobile overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* mobile sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 p-5 pt-8 text-white transition-transform duration-300 md:hidden ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setMobileMenu(false)}
            className="rounded-md p-2 hover:bg-gray-700"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 font-semibold transition hover:bg-gray-700"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <button onClick={handleLogout} className="mt-6 flex w-full items-center gap-3 rounded-xl bg-red-500 px-3 py-2 font-semibold transition hover:bg-red-600">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* desktop sidebar */}
      <div
        className={`hidden min-h-screen bg-gray-700 p-5 pt-8 text-white transition-all duration-300 md:block ${
          desktopOpen ? "w-64" : "w-20"
        }`}
      >
        <button
          className="mb-6 rounded-md p-2 hover:bg-gray-600"
          onClick={() => setDesktopOpen(!desktopOpen)}
        >
          <Menu />
        </button>

        <div className="flex h-[90%] flex-col justify-between">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-2 py-2 font-bold transition hover:bg-gray-600"
              >
                {item.icon}
                {desktopOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </div>

          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-3 py-2 font-bold transition hover:bg-red-600">
            <LogOut size={20} />
            {desktopOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}