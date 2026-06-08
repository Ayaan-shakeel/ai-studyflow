import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  NotebookTabs,
  CheckCircle2,
  BookOpen,
  BrainCircuit,
  Clock3,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeContext";

export default function Home({ user }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  // Reciprocal logic:
  // darkMode === true => LIGHT UI
  // darkMode === false => DARK UI
  const pageClasses = darkMode
    ? "min-h-screen bg-slate-50 text-slate-900"
    : "min-h-screen bg-slate-950 text-white";

  const panelClasses = darkMode
    ? "bg-white border border-slate-200 shadow-sm"
    : "bg-white/5 border border-white/10 backdrop-blur-xl";

  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";
  const softText = darkMode ? "text-slate-500" : "text-slate-400";
  const titleText = darkMode ? "text-slate-900" : "text-white";

  const features = [
    {
      title: "Smart Notes",
      desc: "Organize subject-wise notes, search quickly, and keep study material clean and accessible.",
      icon: <NotebookTabs className="h-5 w-5" />,
      color: darkMode
        ? "bg-cyan-50 text-cyan-700 border-cyan-200"
        : "bg-cyan-500/10 text-cyan-300 border-cyan-400/20"
    },
    {
      title: "Task Tracking",
      desc: "Create tasks, mark them complete, manage priorities, and stay productive every day.",
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: darkMode
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
    },
    {
      title: "Subject Manager",
      desc: "Keep your full study structure organized with subjects for cleaner planning and navigation.",
      icon: <BookOpen className="h-5 w-5" />,
      color: darkMode
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-amber-500/10 text-amber-300 border-amber-400/20"
    },
    {
      title: "AI Study Assistant",
      desc: "Generate notes, quizzes, and quick explanations to make learning faster and more interactive.",
      icon: <BrainCircuit className="h-5 w-5" />,
      color: darkMode
        ? "bg-violet-50 text-violet-700 border-violet-200"
        : "bg-violet-500/10 text-violet-300 border-violet-400/20"
    },
    {
      title: "Study Timer",
      desc: "Use Pomodoro sessions and break timers to maintain focus and complete more in less time.",
      icon: <Clock3 className="h-5 w-5" />,
      color: darkMode
        ? "bg-rose-50 text-rose-700 border-rose-200"
        : "bg-rose-500/10 text-rose-300 border-rose-400/20"
    },
    {
      title: "Unified Dashboard",
      desc: "Track notes, subjects, tasks, and progress from one dashboard built for study workflows.",
      icon: <LayoutDashboard className="h-5 w-5" />,
      color: darkMode
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-blue-500/10 text-blue-300 border-blue-400/20"
    }
  ];

  return (
    <div className={pageClasses}>
      <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 ${panelClasses}`}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-0 right-0 h-36 w-36 rounded-full blur-3xl ${
                  darkMode ? "bg-cyan-200/60" : "bg-cyan-400/10"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 h-32 w-32 rounded-full blur-3xl ${
                  darkMode ? "bg-violet-200/60" : "bg-violet-400/10"
                }`}
              />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-5 ${
                    darkMode
                      ? "bg-slate-100 border border-slate-200 text-slate-700"
                      : "bg-white/5 border border-white/10 text-slate-300"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  AI-powered study platform
                </div>

                <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${titleText}`}>
                  Study smarter with one focused learning workspace
                </h1>

                <p className={`mt-5 text-base sm:text-lg leading-8 ${mutedText}`}>
                  Study Flow helps you manage notes, subjects, tasks, timer sessions, and AI-powered study support in one platform designed for productive learning.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400 active:scale-[0.98] shadow-lg shadow-cyan-950/20"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/ai-study")}
                    className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 active:scale-[0.98] ${
                      darkMode
                        ? "bg-white border border-slate-200 text-slate-900 hover:bg-slate-100"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    Open AI Study
                    <BrainCircuit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                className={`rounded-3xl p-5 sm:p-6 ${
                  darkMode
                    ? "bg-slate-50 border border-slate-200"
                    : "bg-black/20 border border-white/10"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className={`rounded-2xl p-4 ${darkMode ? "bg-white border border-slate-200" : "bg-white/5 border border-white/10"}`}>
                    <p className={softText}>Notes</p>
                    <h3 className={`mt-2 text-xl font-bold ${titleText}`}>Structured</h3>
                  </div>

                  <div className={`rounded-2xl p-4 ${darkMode ? "bg-white border border-slate-200" : "bg-white/5 border border-white/10"}`}>
                    <p className={softText}>Tasks</p>
                    <h3 className={`mt-2 text-xl font-bold ${titleText}`}>Tracked</h3>
                  </div>

                  <div className={`rounded-2xl p-4 ${darkMode ? "bg-white border border-slate-200" : "bg-white/5 border border-white/10"}`}>
                    <p className={softText}>AI Study</p>
                    <h3 className={`mt-2 text-xl font-bold ${titleText}`}>Assisted</h3>
                  </div>

                  <div className={`rounded-2xl p-4 ${darkMode ? "bg-white border border-slate-200" : "bg-white/5 border border-white/10"}`}>
                    <p className={softText}>Timer</p>
                    <h3 className={`mt-2 text-xl font-bold ${titleText}`}>Focused</h3>
                  </div>
                </div>

                <div
                  className={`mt-4 rounded-2xl p-4 ${
                    darkMode
                      ? "bg-cyan-50 border border-cyan-200"
                      : "bg-cyan-500/10 border border-cyan-400/20"
                  }`}
                >
                  <p className={`text-sm font-medium ${darkMode ? "text-cyan-800" : "text-cyan-200"}`}>
                    Built for students who want clean planning, faster revision, and smarter AI-assisted study.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="space-y-5"
          >
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold ${titleText}`}>
                What you can do
              </h2>
              <p className={`mt-2 text-sm sm:text-base ${mutedText}`}>
                Everything in your app brought together as one study platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {features.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 ${panelClasses}`}
                >
                  <div className={`inline-flex rounded-2xl border p-3 ${item.color}`}>
                    {item.icon}
                  </div>

                  <h3 className={`mt-5 text-lg font-semibold ${titleText}`}>
                    {item.title}
                  </h3>

                  <p className={`mt-3 text-sm leading-7 ${mutedText}`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className={`rounded-3xl p-6 sm:p-8 text-center ${panelClasses}`}
          >
            <h2 className={`text-2xl sm:text-3xl font-bold ${titleText}`}>
              Start your focused workflow
            </h2>
            <p className={`mt-3 max-w-2xl mx-auto text-sm sm:text-base ${mutedText}`}>
              Open the dashboard to manage everything, or jump straight into AI Study for notes, quizzes, and explanations.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400 active:scale-[0.98]"
              >
                Open Dashboard
              </button>

              <button
                onClick={() => navigate("/study-timer")}
                className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 active:scale-[0.98] ${
                  darkMode
                    ? "bg-white border border-slate-200 text-slate-900 hover:bg-slate-100"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                Use Study Timer
              </button>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}