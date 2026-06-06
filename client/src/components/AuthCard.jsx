import { motion } from "framer-motion";

export const AuthCard = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden transition-all duration-300 hover:scale-105 rounded-3xl border border-white/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 right-0 h-24 w-24 rounded-full bg-cyan-200/40 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-blue-200/30 blur-2xl" />
          </div>

          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};