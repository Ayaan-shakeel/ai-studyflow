import React, { useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  NotebookTabs,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/dashboard" },
    { name: "Notes", icon: <NotebookTabs size={20} />, to: "/notes" },
    { name: "Subjects", icon: <BookOpen size={20} />, to: "/subjects" },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white px-4 py-3 shadow-md">
        <h1 className="text-lg font-bold">Study Flow</h1>
        <button
          onClick={() => setMobileMenu(true)}
          className="rounded-lg p-2 hover:bg-gray-700 transition"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex h-screen min-h-screen flex-col bg-gray-800 text-white p-4 transition-all duration-300 ${
          desktopOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          {desktopOpen && <h1 className="text-lg font-bold">Study Flow</h1>}
          <button
            onClick={() => setDesktopOpen(!desktopOpen)}
            className="rounded-lg p-2 hover:bg-gray-700 transition"
            aria-label="Toggle desktop sidebar"
          >
            <Menu size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold hover:bg-gray-700 transition"
            >
              <span className="shrink-0">{item.icon}</span>
              {desktopOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl bg-red-500 px-3 py-3 font-semibold hover:bg-red-600 transition w-full">
          <LogOut size={20} />
          {desktopOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 max-w-[85%] bg-gray-800 text-white p-4 transform transition-transform duration-300 md:hidden ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold">Study Flow</h1>
          <button
            onClick={() => setMobileMenu(false)}
            className="rounded-lg p-2 hover:bg-gray-700 transition"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold hover:bg-gray-700 transition"
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl bg-red-500 px-3 py-3 font-semibold hover:bg-red-600 transition w-full">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}