import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Card from '../components/Card';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Trash2,
  BookCopy,
  Layers3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Subjects({ user }) {
  const [subject, setsubject] = useState([]);
  const [formData, setformData] = useState({
    name: ""
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects/get-subjects", {
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
      const res = await axios.post("http://localhost:5000/api/subjects/create-subject", formData, {
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
      const res = await axios.delete(`http://localhost:5000/api/subjects/delete-subject/${id}`, {
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

      <div className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <Navbar user={user} />

          <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.30)]"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative p-5 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 mb-4">
                        <Layers3 className="w-3.5 h-3.5" />
                        Organize your study structure
                      </div>

                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Subjects
                      </h1>

                      <p className="mt-3 text-sm sm:text-base text-slate-300">
                        Create and manage your subjects so your notes and tasks stay organized and easy to navigate.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 min-w-[150px]">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Total
                      </p>
                      <p className="mt-2 text-3xl font-bold text-white tabular-nums">
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
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.24)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3">
                    <Plus className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                      Add Subject
                    </h2>
                    <p className="text-sm text-slate-300">
                      Create a new subject to group your study material.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <div className="flex-1">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                      Subject name
                    </label>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/70"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your subject name"
                      value={formData.name}
                      onChange={(e) => setformData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="sm:self-end">
                    <button
                      className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-cyan-950/30"
                      type="submit"
                    >
                      <Plus className="w-4 h-4" />
                      Add Subject
                    </button>
                  </div>
                </form>
              </motion.section>

              <section className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Your Subjects
                    </h2>
                    <p className="text-sm text-slate-300 mt-1">
                      All your subjects in one place.
                    </p>
                  </div>
                </div>

                {subject.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center backdrop-blur-xl"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <BookCopy className="w-6 h-6 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">No Subjects Yet</h3>
                    <p className="mt-2 text-slate-300 max-w-md mx-auto">
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
                        <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_8px_25px_rgba(0,0,0,0.20)] hover:bg-white/7 hover:-translate-y-1 transition-all duration-300">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                                <FolderKanban className="w-3.5 h-3.5" />
                                Subject
                              </div>

                              <h3 className="text-lg sm:text-xl font-semibold text-white break-words">
                                {subjectItem.name}
                              </h3>

                              <p className="mt-2 text-sm text-slate-300">
                                Keep your notes and tasks neatly grouped under this subject.
                              </p>
                            </div>

                            <button
                              onClick={() => deleteSubject(subjectItem._id)}
                              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 active:scale-[0.96] transition-all duration-300"
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
    </>
  );
}