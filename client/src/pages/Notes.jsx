import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import NotesCard from '../components/NotesCard';
import { BookOpen, Search, NotebookPen, Trash2, Filter, FileText } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Notes({ children }) {
  const [user, setuser] = useState(null);
  const [notes, setnotes] = useState([]);
  const [formData, setformData] = useState({
    title: "",
    content: "",
    subjectId: ""
  });
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState("all");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes/get-notes", {
          withCredentials: true
        });
        if (response.data.status === 1) {
          setnotes(response.data.notes);
        }
      } catch (error) {
        console.log(error);
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
        if (res.data.status === 1) {
          setSubjects(res.data.subjects);
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
      const res = await axios.post("http://localhost:5000/api/notes/create-notes", formData, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        toast.success("Note Added Successfully");
        setnotes([res.data.note, ...notes]);
        setformData({ title: "", content: "", subjectId: "" });
      }
    } catch (error) {
      toast.error("Create Note Failed");
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/notes/delete-notes/${id}`, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        toast.success("Note Deleted Successfully");
        setnotes(notes.filter((note) => note._id !== id));
      }
    } catch (error) {
      toast.error("Note Delete Failed");
      console.log(error);
    }
  };

  const updateNote = async (id, title, content) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/notes/subjects/${id}`, { title, content }, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        setnotes(notes.map((note) => note._id === id ? { ...note, title, content } : note));
        console.log(notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "all" || note.subjectId?._id === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1">
            <Navbar user={user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-blue-500/15 border border-blue-400/20">
                      <NotebookPen className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notes</h1>
                      <p className="text-sm md:text-base text-slate-300">
                        Create, organize, and filter your study notes easily.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-4">
                      <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
                        Title
                      </label>
                      <input
                        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/70"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter note title"
                        value={formData.title}
                        onChange={(e) => setformData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div className="lg:col-span-3">
                      <label htmlFor="subjectId" className="block text-sm font-medium text-slate-200 mb-2">
                        Subject
                      </label>
                      <select
                        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/70"
                        name="subjectId"
                        id="subjectId"
                        value={formData.subjectId}
                        onChange={(e) => setformData({ ...formData, subjectId: e.target.value })}
                      >
                        <option className="text-black" value="">Select Subject</option>
                        {subjects.map((subject) => (
                          <option className="text-black" key={subject._id} value={subject._id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-5">
                      <label htmlFor="content" className="block text-sm font-medium text-slate-200 mb-2">
                        Content
                      </label>
                      <textarea
                        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/70 resize-none"
                        name="content"
                        id="content"
                        placeholder="Enter the content"
                        value={formData.content}
                        onChange={(e) => setformData({ ...formData, content: e.target.value })}
                        rows={5}
                      />
                    </div>

                    <div className="lg:col-span-12">
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all duration-300 px-6 py-3 font-semibold shadow-lg shadow-blue-950/40"
                        type="submit"
                      >
                        <FileText className="w-4 h-4" />
                        Add Note
                      </button>
                    </div>
                  </form>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-md">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        className="w-full rounded-2xl border border-white/10 bg-white/10 pl-11 pr-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/70"
                        type="search"
                        placeholder="Search notes..."
                        name="search"
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full md:w-64">
                      <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <select
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-white/10 pl-11 pr-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/70"
                        name="subjectId"
                        id="subjectFilter"
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                      >
                        <option className="text-black" value="all">All Subjects</option>
                        {subjects.map((subject) => (
                          <option className="text-black" key={subject._id} value={subject._id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  {filteredNotes.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
                      <h2 className="text-2xl font-bold text-white">No Notes Found</h2>
                      <p className="text-slate-300 mt-2">
                        Start by creating a note or adjust your search and subject filter.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl md:text-3xl font-bold text-lime-300">
                          Your Notes
                        </h2>
                        <span className="text-sm text-slate-300">
                          {filteredNotes.length} note{filteredNotes.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredNotes.map((note, index) => (
                          <motion.div
                            key={note._id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="h-full"
                          >
                            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-5 shadow-lg hover:shadow-blue-950/20 hover:border-blue-400/20 transition-all duration-300">
                              <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-400/20 shrink-0">
                                    <BookOpen className="w-4 h-4 text-indigo-300" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-300 truncate">
                                    {note.subjectId?.name || "No Subject"}
                                  </span>
                                </div>

                                <button
                                  onClick={() => deleteNote(note._id)}
                                  className="shrink-0 inline-flex items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <h3 className="text-lg font-semibold text-white line-clamp-2 break-words mb-3">
                                {note.title}
                              </h3>

                              <div className="rounded-2xl bg-black/20 border border-white/5 p-4">
                                <p className="text-sm text-slate-200 whitespace-pre-wrap break-words max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                  {note.content}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}