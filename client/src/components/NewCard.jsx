import React from "react";
import { motion } from "framer-motion";
import { Trash2, StickyNote, Sparkles } from "lucide-react";

export default function NewCard({ note, onDelete, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative   w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-transparent opacity-80" />
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
              <StickyNote size={22} className="text-cyan-300" />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/50">
                <Sparkles size={13} />
                Quick Note
              </div>
              <h2 className="text-xl font-bold leading-tight break-words">
                {note.title}
              </h2>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onDelete(note._id)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
          <p className="text-sm leading-7 text-white/80 break-words whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}