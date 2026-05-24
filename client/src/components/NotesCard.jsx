import { motion } from "framer-motion";

export default function NotesCard({ children }) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-0 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl sm:left-[-80px] sm:top-10 sm:h-72 sm:w-72" />
        <div className="absolute right-[-100px] top-1/4 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl sm:right-[-60px] sm:top-1/3 sm:h-72 sm:w-72" />
        <div className="absolute bottom-[-100px] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl sm:bottom-[-80px] sm:left-1/3 sm:h-72 sm:w-72 sm:translate-x-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-2xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[22px] border border-white/10 bg-white/10 p-3 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[28px] sm:p-5 lg:rounded-[32px] lg:p-6"
        >
          <div className="rounded-[16px] border border-white/10 bg-black/10 p-3 sm:rounded-[20px] sm:p-5 lg:rounded-[24px] lg:p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}