import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { AuthCard } from '../components/AuthCard';
import {
  CheckCircleIcon,
  FolderIcon,
  NotebookIcon,
  ClockIcon,
  Moon,
  Sun,
  Sparkles,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import PageLoader from '../components/PageLoader';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';

export default function Dashboard() {
  const [user, setuser] = useState(null);
  const [notes, setnotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  // const [darkMode, setDarkMode] = useState(true);
  const {darkMode,setDarkMode}=useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true
        });
        setuser(res.data.user);
      } catch (error) {
        console.log(error.message);
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes/get-notes", {
          withCredentials: true
        });
        if (res.data.notes) {
          setnotes(res.data.notes);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects/get-subjects", {
          withCredentials: true
        });
        if (res.data.subjects) {
          setSubjects(res.data.subjects);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks/get-tasks", {
          withCredentials: true
        });
        if (res.data.tasks) {
          setTasks(res.data.tasks);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTasks();
  }, []);

  const pendingTasks = tasks.filter(tasks => !tasks.isDone);

  const completedTasks = tasks.filter(tasks => tasks.isDone).length;
  const pendingTask = tasks.filter(tasks => !tasks.isDone).length;

  const completionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  let message = "";
  if (completionRate === 100) {
    message = "Perfect! You have completed all your tasks. Good job!";
  } else if (completionRate > 60 && completionRate < 100) {
    message = "Good progress! Keep it up";
  } else if (completionRate > 1 && completionRate < 60) {
    message = "Keep it up! You are almost there";
  } else {
    message = "Start Your Journey";
  }

  if (!user) {
    return <PageLoader />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35
      }
    }
  };

  const themeClasses = darkMode
    ? "bg-slate-50 text-slate-900"
    : "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white";

  const panelClasses = darkMode
    ? "bg-white border border-slate-200 shadow-sm"
    : "bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]";

  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";
  const softText = darkMode ? "text-slate-500" : "text-slate-400";
  const titleText = darkMode ? "text-slate-900" : "text-white";
  const iconSurface = darkMode ? "bg-slate-100 border border-slate-200" : "bg-white/10 border border-white/10";
  const progressBg = darkMode ? "bg-slate-200" : "bg-white/10";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl ${darkMode ? "bg-blue-100/70" : "bg-blue-500/20"}`} />
                  <div className={`absolute bottom-0 left-0 h-28 w-28 rounded-full blur-3xl ${darkMode ? "bg-cyan-100/60" : "bg-cyan-400/10"}`} />
                </div>

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 ${
                      darkMode ? "bg-slate-100 text-slate-700 border border-slate-200" : "bg-white/10 text-slate-200 border border-white/10"
                    }`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      Student productivity dashboard
                    </div>

                    <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${titleText}`}>
                      Welcome back, {user?.username}
                    </h1>

                    <p className={`mt-3 text-sm sm:text-base ${mutedText}`}>
                      Track your notes, subjects, and tasks in one place and stay focused on what matters most today.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 font-medium transition-all duration-300 active:scale-[0.98] ${
                        darkMode
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                      }`}
                    >
                      {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      <span className="text-sm">{darkMode ? "Dark" : "Light"} Mode</span>
                    </button>

                    <button
                      onClick={() => navigate("/tasks")}
                      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 font-medium transition-all duration-300 active:scale-[0.98] ${
                        darkMode
                          ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-200/40"
                          : "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-950/30"
                      }`}
                    >
                      Open Tasks
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.section>

              <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => navigate("/notes")}
                    className={`w-full h-full text-left rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${panelClasses}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${iconSurface}`}>
                        <NotebookIcon className={`w-6 h-6 ${darkMode ? "text-blue-600" : "text-blue-300"}`} />
                      </div>
                      <span className={`text-xs font-medium ${softText}`}>Notes</span>
                    </div>

                    <h2 className={`text-lg font-semibold ${titleText}`}>Notes</h2>

                    {notes.length === 0 ? (
                      <div className="mt-4">
                        <p className={`text-2xl font-bold ${titleText}`}>0</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          No notes yet. Add some new notes for your studies.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className={`text-3xl font-bold tabular-nums ${titleText}`}>{notes.length}</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          Total notes saved for your studies.
                        </p>
                      </div>
                    )}
                  </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => navigate("/subjects")}
                    className={`w-full h-full text-left rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${panelClasses}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${iconSurface}`}>
                        <FolderIcon className={`w-6 h-6 ${darkMode ? "text-amber-600" : "text-amber-300"}`} />
                      </div>
                      <span className={`text-xs font-medium ${softText}`}>Subjects</span>
                    </div>

                    <h2 className={`text-lg font-semibold ${titleText}`}>Subjects</h2>

                    {subjects.length === 0 ? (
                      <div className="mt-4">
                        <p className={`text-2xl font-bold ${titleText}`}>0</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          You have not created any subjects yet.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className={`text-3xl font-bold tabular-nums ${titleText}`}>{subjects.length}</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          Total subjects currently organized.
                        </p>
                      </div>
                    )}
                  </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => navigate("/tasks")}
                    className={`w-full h-full text-left rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${panelClasses}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${iconSurface}`}>
                        <CheckCircleIcon className={`w-6 h-6 ${darkMode ? "text-emerald-600" : "text-emerald-300"}`} />
                      </div>
                      <span className={`text-xs font-medium ${softText}`}>Tasks</span>
                    </div>

                    <h2 className={`text-lg font-semibold ${titleText}`}>Tasks</h2>

                    {tasks.length === 0 ? (
                      <div className="mt-4">
                        <p className={`text-2xl font-bold ${titleText}`}>0</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          Add a new task to stay productive.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className={`text-3xl font-bold tabular-nums ${titleText}`}>{tasks.length}</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          Total tasks tracked on your dashboard.
                        </p>
                      </div>
                    )}
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="sm:col-span-2 xl:col-span-1">
                  <button
                    onClick={() => navigate("/task", { state: { filter: "pending" } })}
                    className={`w-full h-full text-left rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${panelClasses}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${iconSurface}`}>
                        <ClockIcon className={`w-6 h-6 ${darkMode ? "text-rose-600" : "text-rose-300"}`} />
                      </div>
                      <span className={`text-xs font-medium ${softText}`}>Pending</span>
                    </div>

                    <h2 className={`text-lg font-semibold ${darkMode ? "text-rose-600" : "text-rose-300"}`}>
                      Pending Tasks
                    </h2>

                    {pendingTasks.length === 0 ? (
                      <div className="mt-4">
                        <p className={`text-2xl font-bold ${titleText}`}>0</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          You have successfully completed all your tasks.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className={`text-3xl font-bold tabular-nums ${titleText}`}>{pendingTasks.length}</p>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          {pendingTasks.length > 0
                            ? `You have ${pendingTasks.length} pending tasks to finish today`
                            : "All tasks are completed. Great Work!"}
                        </p>
                      </div>
                    )}
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="sm:col-span-2 xl:col-span-2">
                  <div className={`h-full rounded-3xl p-5 sm:p-6 ${panelClasses}`}>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${iconSurface}`}>
                        <BarChart3 className={`w-6 h-6 ${darkMode ? "text-violet-600" : "text-violet-300"}`} />
                      </div>
                      <span className={`text-xs font-medium ${softText}`}>Performance</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className={`text-lg font-semibold ${titleText}`}>Completion Rate</h2>
                        <p className={`mt-2 text-sm ${mutedText}`}>
                          You are {completionRate}% productive today.
                        </p>
                        <p className={`mt-2 text-sm font-medium ${darkMode ? "text-slate-700" : "text-slate-200"}`}>
                          {message}
                        </p>

                        <div className={`mt-5 h-3 w-full overflow-hidden rounded-full ${progressBg}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionRate}%` }}
                            transition={{ duration: 0.7 }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
                          />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3 text-sm">
                          <span className={`rounded-full px-3 py-1 ${darkMode ? "bg-slate-100 text-slate-700" : "bg-white/10 text-slate-200"}`}>
                            Completed: {completedTasks}
                          </span>
                          <span className={`rounded-full px-3 py-1 ${darkMode ? "bg-slate-100 text-slate-700" : "bg-white/10 text-slate-200"}`}>
                            Pending: {pendingTask}
                          </span>
                        </div>
                      </div>

                      <div className={`rounded-3xl p-5 ${darkMode ? "bg-slate-50 border border-slate-200" : "bg-black/20 border border-white/10"}`}>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={mutedText}>Task progress</span>
                            <span className={`font-semibold tabular-nums ${titleText}`}>{completionRate}%</span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span className={mutedText}>Completed tasks</span>
                                <span className={titleText}>{completedTasks}</span>
                              </div>
                              <div className={`h-2 rounded-full ${progressBg}`}>
                                <div
                                  className="h-2 rounded-full bg-emerald-500"
                                  style={{ width: `${completionRate}%` }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span className={mutedText}>Pending tasks</span>
                                <span className={titleText}>{pendingTask}</span>
                              </div>
                              <div className={`h-2 rounded-full ${progressBg}`}>
                                <div
                                  className="h-2 rounded-full bg-rose-500"
                                  style={{ width: `${100 - completionRate}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}