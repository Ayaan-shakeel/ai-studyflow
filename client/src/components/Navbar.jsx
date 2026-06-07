import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X, Home, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ user, darkMode, setDarkMode }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-sm">
              <img
                src={logo}
                alt="Study Flow logo"
                className="h-10 w-10 rounded-xl object-cover sm:h-11 sm:w-11"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg sm:text-xl font-bold tracking-tight text-white">
                Study Flow
              </h1>
              <p className="hidden sm:block text-xs text-slate-400">
                Smart study workspace
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200">
              <UserCircle2 className="h-4 w-4 text-cyan-300" />
              <span className="max-w-[140px] truncate">
                {user?.username ? user.username : "Guest"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 hover:bg-white/10 active:scale-[0.96]"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="md:hidden pb-4"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-white/10"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>

                  <div className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200">
                    <UserCircle2 className="h-4 w-4 text-cyan-300" />
                    <span>{user?.username ? user.username : "Guest"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}