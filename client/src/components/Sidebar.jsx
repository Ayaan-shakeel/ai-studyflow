import React, { useState } from "react";
import {
  BookOpen,
  CheckCircleIcon,
  Clock10Icon,
  LayoutDashboard,
  LogOut,
  Menu,
  NotebookTabs,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Notes", icon: <NotebookTabs size={20} />, path: "/notes" },
    { name: "Subjects", icon: <BookOpen size={20} />, path: "/subjects" },
    { name: "Tasks", icon: <CheckCircleIcon size={20} />, path: "/tasks" },
    { name: "Study Timer", icon: <Clock10Icon size={20} />, path: "/study-timer" }
  ];

  const handleLogout = () => {
    console.log("btn clicked");
    localStorage.removeItem("token");
    window.location.href = "/login";
    toast.success("Logged out successfully");
  };

  const linkClasses = (path, isDesktop = false) => {
    const active = location.pathname === path;

    return `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-300 ${
      active
        ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950/20"
        : "text-slate-200 hover:bg-white/10 hover:text-white"
    } ${isDesktop && !desktopOpen ? "justify-center px-2" : ""}`;
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Mobile trigger */}
<div className="fixed right-5 top-4 z-[80] md:hidden">
  <button
    onClick={() => setMobileMenu(true)}
    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/90 text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-slate-900 active:scale-[0.96]"
    aria-label="Open menu"
  >
    <Menu size={22} />
  </button>
</div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
            />

            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-slate-950/95 p-5 text-white shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Study Flow</h2>
                  <p className="text-sm text-slate-400">Navigation menu</p>
                </div>

                <button
                  onClick={() => setMobileMenu(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 active:scale-[0.96]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex h-[calc(100%-5rem)] flex-col justify-between">
                <div className="space-y-2">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenu(false)}
                      className={linkClasses(item.path)}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-6 inline-flex min-h-[48px] w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 active:scale-[0.98] shadow-lg shadow-red-950/30"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={`hidden min-h-screen border-r border-white/10 bg-slate-950/95 text-white shadow-[0_0_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 md:flex md:flex-col ${
          desktopOpen ? "w-72" : "w-24"
        }`}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <div className={`mb-8 flex items-center ${desktopOpen ? "justify-between" : "justify-center"}`}>
            {desktopOpen && (
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold tracking-tight">Study Flow</h2>
                <p className="text-xs text-slate-400">Productivity panel</p>
              </div>
            )}

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 active:scale-[0.96]"
              onClick={() => setDesktopOpen(!desktopOpen)}
              aria-label="Toggle desktop sidebar"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="flex h-full flex-col justify-between">
            <nav className="space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={linkClasses(item.path, true)}
                  title={!desktopOpen ? item.name : ""}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {desktopOpen && <span className="truncate">{item.name}</span>}
                </Link>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className={`inline-flex min-h-[48px] items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 active:scale-[0.98] shadow-lg shadow-red-950/30 ${
                desktopOpen ? "justify-start" : "justify-center px-2"
              }`}
              title={!desktopOpen ? "Logout" : ""}
            >
              <LogOut size={18} />
              {desktopOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}