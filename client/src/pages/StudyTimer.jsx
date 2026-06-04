import React, { useEffect, useState } from 'react';
import { TimerCard } from '../components/TimerCard';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import {
  TimerReset,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  MoonStar,
  CheckCircle2,
} from 'lucide-react';

export default function StudyTimer({ user }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("Pomodoro");
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds => seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes => minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          if (mode === "Pomodoro") {
            setSessions(prev => prev + 1);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const changeMode = (newMode, newMinutes) => {
    setMode(newMode);
    setMinutes(newMinutes);
    setSeconds(0);
    setIsActive(false);
  };

  const modeButtonClass = (name) =>
    `flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-300 border ${
      mode === name
        ? name === "Pomodoro"
          ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-950/30"
          : name === "Short Break"
          ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-950/30"
          : "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-950/30"
        : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <Navbar user={user} />

      <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 lg:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.28)]"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 mb-4">
                  <TimerReset className="w-3.5 h-3.5" />
                  Focus timer for study sessions
                </div>

                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Study Session Timer
                </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-300">
                  Stay focused with Pomodoro sessions, take mindful breaks, and track how many sessions you complete.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 min-w-[170px]">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Sessions Completed
                </p>
                <p className="mt-2 text-3xl font-bold text-white tabular-nums">
                  {sessions}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 lg:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.22)]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <button
                  className={modeButtonClass("Pomodoro")}
                  onClick={() => changeMode("Pomodoro", 25)}
                >
                  <Brain className="w-4 h-4" />
                  Pomodoro
                </button>

                <button
                  className={modeButtonClass("Short Break")}
                  onClick={() => changeMode("Short Break", 5)}
                >
                  <Coffee className="w-4 h-4" />
                  Short Break
                </button>

                <button
                  className={modeButtonClass("Long Break")}
                  onClick={() => changeMode("Long Break", 15)}
                >
                  <MoonStar className="w-4 h-4" />
                  Long Break
                </button>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">
                  Current Mode
                </p>

                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                  {mode}
                </h2>

                <motion.div
                  key={`${minutes}-${seconds}-${mode}`}
                  initial={{ scale: 0.96, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/5 to-blue-500/10 shadow-[0_0_0_12px_rgba(255,255,255,0.02)] w-56 h-56 sm:w-72 sm:h-72 mb-8"
                >
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                      Time Left
                    </p>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white tabular-nums">
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                  <button
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-950/30"
                    onClick={() => setIsActive(true)}
                  >
                    <Play className="w-4 h-4" />
                    Start
                  </button>

                  <button
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-violet-950/30"
                    onClick={() => setIsActive(false)}
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>

                  <button
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-slate-700 px-5 py-3 font-semibold text-slate-100 hover:bg-slate-600 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-black/20"
                    onClick={() => {
                      setIsActive(false);
                      setMinutes(25);
                      setSeconds(0);
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Session Summary</h3>
                  <p className="text-sm text-slate-300">
                    A quick view of your current timer state.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Mode
                  </p>
                  <p className="text-lg font-semibold text-white">{mode}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Status
                  </p>
                  <p className={`text-lg font-semibold ${isActive ? "text-emerald-300" : "text-slate-200"}`}>
                    {isActive ? "Running" : "Paused"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Sessions Completed
                  </p>
                  <p className="text-lg font-semibold text-white tabular-nums">{sessions}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Current Time
                  </p>
                  <p className="text-lg font-semibold text-white tabular-nums">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}