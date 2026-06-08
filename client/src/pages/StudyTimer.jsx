import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
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
import { useTheme } from '../components/ThemeContext';

export default function StudyTimer({ user }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("Pomodoro");
  const [sessions, setSessions] = useState(0);

  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          if (mode === "Pomodoro") {
            setSessions((prev) => prev + 1);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode]);

  const changeMode = (newMode, newMinutes) => {
    setMode(newMode);
    setMinutes(newMinutes);
    setSeconds(0);
    setIsActive(false);
  };

  const pageClasses = darkMode
    ? "min-h-screen bg-slate-50 text-slate-900"
    : "min-h-screen bg-slate-950 text-white";

  const panelClasses = darkMode
    ? "border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
    : "border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.22)]";

  const softPanelClasses = darkMode
    ? "border border-slate-200 bg-slate-50"
    : "border border-white/10 bg-white/5";

  const titleText = darkMode ? "text-slate-900" : "text-white";
  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";
  const faintText = darkMode ? "text-slate-500" : "text-slate-400";

  const timerShell = darkMode
    ? "border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 shadow-[0_0_0_12px_rgba(15,23,42,0.03)]"
    : "border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/5 to-blue-500/10 shadow-[0_0_0_12px_rgba(255,255,255,0.02)]";

  const innerRing = darkMode ? "border-slate-200" : "border-white/10";

  const modeButtonClass = (name) =>
    `flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-300 border ${
      mode === name
        ? name === "Pomodoro"
          ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-950/30"
          : name === "Short Break"
          ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-950/30"
          : "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-950/30"
        : darkMode
        ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
        : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
    }`;

  return (
    <div className={pageClasses}>
      <div className='flex'>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='flex-1'>

      <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`mb-8 rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 ${softPanelClasses} ${mutedText}`}>
                  <TimerReset className="w-3.5 h-3.5" />
                  Focus timer for study sessions
                </div>

                <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${titleText}`}>
                  Study Session Timer
                </h1>

                <p className={`mt-3 text-sm sm:text-base ${mutedText}`}>
                  Stay focused with Pomodoro sessions, take mindful breaks, and track how many sessions you complete.
                </p>
              </div>

              <div className={`rounded-2xl px-4 py-3 min-w-[170px] ${softPanelClasses}`}>
                <p className={`text-xs uppercase tracking-[0.2em] ${faintText}`}>
                  Sessions Completed
                </p>
                <p className={`mt-2 text-3xl font-bold tabular-nums ${titleText}`}>
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
            <div className={`xl:col-span-2 rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}>
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
                <p className={`text-sm uppercase tracking-[0.25em] mb-4 ${faintText}`}>
                  Current Mode
                </p>

                <h2 className={`text-xl sm:text-2xl font-semibold mb-6 ${titleText}`}>
                  {mode}
                </h2>

                <motion.div
                  key={`${minutes}-${seconds}-${mode}`}
                  initial={{ scale: 0.96, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`relative flex items-center justify-center rounded-full border w-56 h-56 sm:w-72 sm:h-72 mb-8 ${timerShell}`}
                >
                  <div className={`absolute inset-4 rounded-full border ${innerRing}`} />
                  <div className="text-center">
                    <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${faintText}`}>
                      Time Left
                    </p>
                    <h1 className={`text-5xl sm:text-7xl font-bold tracking-tight tabular-nums ${titleText}`}>
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
                    className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold active:scale-[0.98] transition-all duration-300 ${
                      darkMode
                        ? "bg-slate-200 text-slate-800 hover:bg-slate-300 shadow-sm"
                        : "bg-slate-700 text-slate-100 hover:bg-slate-600 shadow-lg shadow-black/20"
                    }`}
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

            <div className={`rounded-3xl p-5 sm:p-6 ${panelClasses}`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`rounded-2xl border p-3 ${
                    darkMode
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-emerald-400/20 bg-emerald-500/10"
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 ${darkMode ? "text-emerald-600" : "text-emerald-300"}`}
                  />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${titleText}`}>Session Summary</h3>
                  <p className={`text-sm ${mutedText}`}>
                    A quick view of your current timer state.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                  <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${faintText}`}>
                    Mode
                  </p>
                  <p className={`text-lg font-semibold ${titleText}`}>{mode}</p>
                </div>

                <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                  <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${faintText}`}>
                    Status
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      isActive ? "text-emerald-500" : darkMode ? "text-slate-700" : "text-slate-200"
                    }`}
                  >
                    {isActive ? "Running" : "Paused"}
                  </p>
                </div>

                <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                  <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${faintText}`}>
                    Sessions Completed
                  </p>
                  <p className={`text-lg font-semibold tabular-nums ${titleText}`}>{sessions}</p>
                </div>

                <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                  <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${faintText}`}>
                    Current Time
                  </p>
                  <p className={`text-lg font-semibold tabular-nums ${titleText}`}>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      </div>
      </div>
    </div>
  );
}