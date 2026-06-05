import React, { useState } from "react";
import { BookOpen, LayoutDashboard, LogOut, Menu, NotebookTabs, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Notes", icon: <NotebookTabs size={20} />, path: "/notes" },
    { name: "Subjects", icon: <BookOpen size={20} />, path: "/subjects" },
  ];

  return (
    <>
      {/* mobile topbar */}
      <div className="fixed top-0 left-0 z-40 flex w-full items-center justify-between bg-gray-800 px-4 py-3 text-white shadow-md md:hidden">
        <button onClick={() => setMobileMenu(true)} className="rounded-md p-2 hover:bg-gray-700">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold">Study Flow</h1>
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

          <button className="mt-6 flex w-full items-center gap-3 rounded-xl bg-red-500 px-3 py-2 font-semibold transition hover:bg-red-600">
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

          <button className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-3 py-2 font-bold transition hover:bg-red-600">
            <LogOut size={20} />
            {desktopOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}