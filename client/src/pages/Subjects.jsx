import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Trash2,
  BookCopy,
  Layers3,
} from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

export default function Subjects({ user }) {
  const [subject, setsubject] = useState([]);
  const [formData, setformData] = useState({
    name: ""
  });

  const { darkMode } = useTheme();

  const pageClasses = darkMode
    ? "min-h-screen bg-slate-50 text-slate-900"
    : "min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white";

  const panelClasses = darkMode
    ? "rounded-3xl border border-slate-200 bg-white shadow-sm"
    : "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl";

  const titleClasses = darkMode ? "text-slate-900" : "text-white";
  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";
  const softText = darkMode ? "text-slate-500" : "text-slate-400";

  const inputClasses = darkMode
    ? "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/30"
    : "w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/70";

  const statBoxClasses = darkMode
    ? "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 min-w-[150px]"
    : "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 min-w-[150px]";

  const badgeClasses = darkMode
    ? "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
    : "inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200";

  const addIconBox = darkMode
    ? "rounded-2xl border border-emerald-200 bg-emerald-50 p-3"
    : "rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3";

  const emptyIconBox = darkMode
    ? "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100"
    : "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5";

  const cardClasses = darkMode
    ? "h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
    : "h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_8px_25px_rgba(0,0,0,0.20)] hover:bg-white/7 hover:-translate-y-1 transition-all duration-300";

  const deleteBtnClasses = darkMode
    ? "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.96] transition-all duration-300"
    : "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 active:scale-[0.96] transition-all duration-300";

  const primaryButton = darkMode
    ? "inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700 active:scale-[0.98] transition-all duration-300 shadow-sm"
    : "inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-cyan-950/30";

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(  `${import.meta.env.VITE_API_URL}/api/subjects/get-subjects`, {
          withCredentials: true
        });
        if (res.data.status === 1) {
          setsubject(res.data.subjects);
          console.log(res.data.subjects);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(  `${import.meta.env.VITE_API_URL}/api/subjects/create-subject`, formData, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        toast.success("Subject Added Successfully");
        setsubject([res.data.subject, ...subject]);
        setformData({ name: "" });
      }
    } catch (error) {
      toast.error("Subject Add Failed");
      console.log(error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      const res = await axios.delete(  `${import.meta.env.VITE_API_URL}/api/subjects/delete-subject/${id}`, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        toast.success("Subject Deleted Successfully");
        setsubject(subject.filter(subject => subject._id !== id));
        console.log(subject.filter(subject => subject._id !== id));
      }
    } catch (error) {
      toast.error("Subject Delete Failed");
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={pageClasses}>
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1 min-w-0">
            <Navbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              <div className="max-w-7xl mx-auto space-y-8">
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`relative overflow-hidden ${panelClasses}`}
                >
                  {!darkMode && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
                      <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                    </div>
                  )}

                  <div className="relative p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="max-w-2xl">
                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 ${
                          darkMode
                            ? "border border-slate-200 bg-slate-100 text-slate-600"
                            : "border border-white/10 bg-white/5 text-slate-300"
                        }`}>
                          <Layers3 className="w-3.5 h-3.5" />
                          Organize your study structure
                        </div>

                        <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${titleClasses}`}>
                          Subjects
                        </h1>

                        <p className={`mt-3 text-sm sm:text-base ${mutedText}`}>
                          Create and manage your subjects so your notes and tasks stay organized and easy to navigate.
                        </p>
                      </div>

                      <div className={statBoxClasses}>
                        <p className={`text-xs uppercase tracking-[0.2em] ${softText}`}>
                          Total
                        </p>
                        <p className={`mt-2 text-3xl font-bold tabular-nums ${titleClasses}`}>
                          {subject.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className={`p-5 sm:p-6 lg:p-8 ${panelClasses}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={addIconBox}>
                      <Plus className={`w-5 h-5 ${darkMode ? "text-emerald-600" : "text-emerald-300"}`} />
                    </div>
                    <div>
                      <h2 className={`text-lg sm:text-xl font-semibold ${titleClasses}`}>
                        Add Subject
                      </h2>
                      <p className={`text-sm ${mutedText}`}>
                        Create a new subject to group your study material.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <div className="flex-1">
                      <label htmlFor="name" className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-700" : "text-slate-200"}`}>
                        Subject name
                      </label>
                      <input
                        className={inputClasses}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your subject name"
                        value={formData.name}
                        onChange={(e) => setformData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="sm:self-end">
                      <button className={primaryButton} type="submit">
                        <Plus className="w-4 h-4" />
                        Add Subject
                      </button>
                    </div>
                  </form>
                </motion.section>

                <section className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold ${titleClasses}`}>
                        Your Subjects
                      </h2>
                      <p className={`text-sm mt-1 ${mutedText}`}>
                        All your subjects in one place.
                      </p>
                    </div>
                  </div>

                  {subject.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`p-10 text-center ${panelClasses} ${darkMode ? "" : "border-dashed border-white/15"}`}
                    >
                      <div className={emptyIconBox}>
                        <BookCopy className={`w-6 h-6 ${darkMode ? "text-slate-500" : "text-slate-300"}`} />
                      </div>
                      <h3 className={`text-2xl font-bold ${titleClasses}`}>No Subjects Yet</h3>
                      <p className={`mt-2 max-w-md mx-auto ${mutedText}`}>
                        You have not created any subjects yet. Add your first subject to start organizing your study content.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {subject.map((subjectItem, index) => (
                        <motion.div
                          key={subjectItem._id}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="h-full"
                        >
                          <div className={cardClasses}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <div className={badgeClasses}>
                                  <FolderKanban className="w-3.5 h-3.5" />
                                  Subject
                                </div>

                                <h3 className={`text-lg sm:text-xl font-semibold break-words ${titleClasses}`}>
                                  {subjectItem.name}
                                </h3>

                                <p className={`mt-2 text-sm ${mutedText}`}>
                                  Keep your notes and tasks neatly grouped under this subject.
                                </p>
                              </div>

                              <button
                                onClick={() => deleteSubject(subjectItem._id)}
                                className={deleteBtnClasses}
                                aria-label={`Delete ${subjectItem.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}