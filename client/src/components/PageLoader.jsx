import React from 'react';
import Logo from '../assets/logo.png';
import { useTheme } from "../components/ThemeContext";

export default function PageLoader() {
  const { darkMode } = useTheme();

  // Reciprocal logic:
  // darkMode === true => LIGHT UI
  // darkMode === false => DARK UI

  const overlayClasses = darkMode
    ? "bg-slate-50/95 backdrop-blur-md"
    : "bg-slate-950/95 backdrop-blur-md";

  const titleText = darkMode ? "text-slate-900" : "text-white";
  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";

  const ringOuter = darkMode
    ? "border-slate-300/70"
    : "border-emerald-400/20";

  const ringPulse = darkMode
    ? "bg-slate-900/5"
    : "bg-emerald-400/10";

  const ringSpin = darkMode
    ? "border-slate-300/60 border-t-slate-900"
    : "border-emerald-400/20 border-t-emerald-400";

  const logoShell = darkMode
    ? "bg-white border border-slate-200 shadow-sm"
    : "bg-white/5 border border-white/10 shadow-lg";

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${overlayClasses}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className={`absolute h-24 w-24 rounded-full border ${ringOuter}`}></div>
          <div className={`absolute h-24 w-24 animate-ping rounded-full ${ringPulse}`}></div>
          <div className={`absolute h-16 w-16 animate-spin rounded-full border-4 ${ringSpin}`}></div>

          <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl p-1.5 ${logoShell}`}>
            <img
              src={Logo}
              alt="AI Study Flow logo"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className={`text-xl font-semibold tracking-wide sm:text-2xl ${titleText}`}>
            AI Study Flow
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${mutedText}`}>
            Loading experience...
          </p>
        </div>
      </div>
    </div>
  );
}