import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Home, UserCircle2, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function Navbar({ user }) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div>

    <nav
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-colors duration-300 ${
        darkMode
        ? "bg-white/80 border-slate-200 text-slate-900"
         : "bg-slate-950/80 border-white/10 text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="flex min-w-0 items-center gap-3 pl-14 md:pl-0"
          >
            <div
              className={`shrink-0 rounded-2xl border p-1.5 shadow-sm ${
                darkMode
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-slate-100"
              }`}
            >
              <img
                src={logo}
                alt="Study Flow logo"
                className="h-10 w-10 rounded-xl object-cover sm:h-11 sm:w-11"
              />
            </div>

            <div className="min-w-0">
              <h1
                className={`truncate text-lg sm:text-xl font-bold tracking-tight ${
                  darkMode ? "text-slate-900" : "text-white"
                }`}
              >
                Study Flow
              </h1>
              <p
                className={`hidden sm:block text-xs ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Smart study workspace
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <Link
              to="/"
              className={`hidden md:inline-flex min-h-[44px] items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                darkMode
                ?"text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <div
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-2xl border px-3 sm:px-4 py-2.5 text-sm font-medium ${
                darkMode
                ? "border-slate-200 bg-slate-100 text-slate-700"
                : "border-white/10 bg-white/5 text-slate-200"
              }`}
            >
              <UserCircle2
                className={`h-4 w-4 ${
                  darkMode ? "text-cyan-600" : "text-cyan-300"
                }`}
              />
              <span className="max-w-[100px] sm:max-w-[140px] truncate">
                {user?.username ? user.username : "Guest"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 active:scale-[0.96] ${
                darkMode
                ?"border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200"
                :"border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
        </div>
  );
}