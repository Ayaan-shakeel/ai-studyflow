import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Star,
  Trash2,
  Search,
  CalendarDays,
  CircleCheckBig,
  Plus,
  ListTodo
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';

export default function Task({ user }) {
  const [task, setTask] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    isPriority: false,
    isDone: false
  });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const location = useLocation();
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(  `${import.meta.env.VITE_API_URL}/api/tasks/get-tasks`, {
          withCredentials: true
        });
        if (res.data.status === 1) {
          setTask(res.data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (location.state?.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(  `${import.meta.env.VITE_API_URL}/api/tasks/create-task`, formData, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        toast.success("Task Added Successfully");
        setTask([res.data.task, ...task]);
        setFormData({ title: '', dueDate: '', isPriority: false, isDone: false });
      }
    } catch (error) {
      toast.error("Create Task Failed");
      console.log(error);
    }
  };

  const toggleTask = async (id, currentStatus) => {
    try {
      const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tasks/update-task/${id}`,
        { isDone: !currentStatus },
        { withCredentials: true }
      );
      if (res.data.status === 1) {
        setTask(task.map((t) => (t._id === id ? { ...t, isDone: !currentStatus } : t)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(  `${import.meta.env.VITE_API_URL}/api/tasks/delete-task/${id}`, {
        withCredentials: true
      });
      if (res.data.status === 1) {
        toast.success("Task Deleted Successfully");
        setTask(task.filter((task) => task._id !== id));
      }
    } catch (error) {
      toast.error("Task Delete Failed");
      console.log(error);
    }
  };

  const filteredTasks = task.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    if (filter === 'completed') return matchesSearch && task.isDone;
    if (filter === 'pending') return matchesSearch && !task.isDone;
    if (filter === 'priority') return matchesSearch && task.isPriority;
    return matchesSearch;
  });

  // FIXED TO MATCH YOUR OTHER FILES:
  // darkMode === true => LIGHT UI
  // darkMode === false => DARK UI

  const pageClasses = darkMode
    ? "min-h-screen bg-slate-50 text-slate-900"
    : "min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white";

  const panelClasses = darkMode
    ? "border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
    : "border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.28)]";

  const softPanelClasses = darkMode
    ? "border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.06)]"
    : "border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.22)]";

  const headingText = darkMode ? "text-slate-900" : "text-white";
  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";
  const lightMutedText = darkMode ? "text-slate-500" : "text-slate-400";

  const badgeShell = darkMode
    ? "border border-slate-200 bg-slate-100 text-slate-700"
    : "border border-white/10 bg-white/5 text-slate-300";

  const inputClasses = darkMode
    ? "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40"
    : "w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/70";

  const checkboxWrap = darkMode
    ? "flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer"
    : "flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 cursor-pointer";

  const statBoxClasses = darkMode
    ? "border border-slate-200 bg-slate-50"
    : "border border-white/10 bg-white/5";

  const filterButtonClass = (name) =>
    `rounded-2xl px-4 py-2.5 text-sm font-medium border transition-all duration-300 active:scale-[0.98] ${
      filter === name
        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-950/30"
        : darkMode
        ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
        : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
    }`;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={pageClasses}>
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1 min-w-0">
            <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              <div className="max-w-7xl mx-auto space-y-8">
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 ${badgeShell}`}>
                        <ListTodo className="w-3.5 h-3.5" />
                        Manage your daily workflow
                      </div>

                      <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${headingText}`}>
                        Tasks
                      </h1>

                      <p className={`mt-3 text-sm sm:text-base ${mutedText}`}>
                        Add tasks, mark them complete, and filter your workflow by status or priority.
                      </p>
                    </div>

                    <div className={`rounded-2xl px-4 py-3 min-w-[150px] ${statBoxClasses}`}>
                      <p className={`text-xs uppercase tracking-[0.2em] ${lightMutedText}`}>
                        Total Tasks
                      </p>
                      <p className={`mt-2 text-3xl font-bold tabular-nums ${headingText}`}>
                        {task.length}
                      </p>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className={`rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3">
                      <Plus className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <h2 className={`text-lg sm:text-xl font-semibold ${headingText}`}>
                        Create Task
                      </h2>
                      <p className={`text-sm ${mutedText}`}>
                        Add a task with due date and priority in one step.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6">
                      <label
                        htmlFor="title"
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-700" : "text-slate-200"}`}
                      >
                        Task title
                      </label>
                      <input
                        className={inputClasses}
                        type="text"
                        placeholder="Enter task"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div className="lg:col-span-3">
                      <label
                        htmlFor="dueDate"
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-700" : "text-slate-200"}`}
                      >
                        Due date
                      </label>
                      <input
                        className={inputClasses}
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>

                    <div className="lg:col-span-3 flex items-end">
                      <label className={checkboxWrap}>
                        <input
                          className="h-4 w-4 accent-cyan-500"
                          type="checkbox"
                          name="isPriority"
                          id="isPriority"
                          checked={formData.isPriority}
                          onChange={(e) => setFormData({ ...formData, isPriority: e.target.checked })}
                        />
                        <span className={`text-sm ${darkMode ? "text-slate-700" : "text-slate-200"}`}>
                          Mark as priority
                        </span>
                      </label>
                    </div>

                    <div className="lg:col-span-12">
                      <button
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-cyan-950/30"
                        type="submit"
                      >
                        <Plus className="w-4 h-4" />
                        Add Task
                      </button>
                    </div>
                  </form>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="space-y-5"
                >
                  <div className={`rounded-3xl p-4 sm:p-5 ${softPanelClasses}`}>
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                      <div className="relative w-full lg:max-w-md">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${lightMutedText}`} />
                        <input
                          className={`${inputClasses} pl-11 pr-4`}
                          type="search"
                          placeholder="Search tasks..."
                          name="search"
                          id="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button type="button" className={filterButtonClass("all")} onClick={() => setFilter('all')}>
                          All
                        </button>
                        <button type="button" className={filterButtonClass("completed")} onClick={() => setFilter('completed')}>
                          Completed
                        </button>
                        <button type="button" className={filterButtonClass("pending")} onClick={() => setFilter('pending')}>
                          Pending
                        </button>
                        <button type="button" className={filterButtonClass("priority")} onClick={() => setFilter('priority')}>
                          Priority
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    {task.length === 0 ? (
                      <div
                        className={`rounded-3xl border border-dashed p-10 text-center ${
                          darkMode ? "border-slate-300 bg-white" : "border-white/15 bg-white/5"
                        }`}
                      >
                        <div
                          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                            darkMode ? "border border-slate-200 bg-slate-50" : "border border-white/10 bg-white/5"
                          }`}
                        >
                          <ListTodo className={`w-6 h-6 ${darkMode ? "text-slate-500" : "text-slate-300"}`} />
                        </div>
                        <h2 className={`text-2xl font-bold ${headingText}`}>No Task Yet</h2>
                        <p className={`mt-2 ${mutedText}`}>
                          Add your first task to start planning your work.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div>
                            <h2 className={`text-2xl font-bold ${headingText}`}>Tasks List</h2>
                            <p className={`text-sm mt-1 ${mutedText}`}>
                              {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} shown
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                          {filteredTasks.map((taskItem, index) => (
                            <motion.div
                              key={taskItem._id}
                              initial={{ opacity: 0, y: 18 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="h-full"
                            >
                              <div
                                className={`h-full rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                                  taskItem.isDone
                                    ? "border-emerald-400/20 bg-emerald-500/10"
                                    : darkMode
                                    ? "border-slate-200 bg-white"
                                    : "border-white/10 bg-white/5"
                                } shadow-[0_8px_25px_rgba(0,0,0,0.12)]`}
                              >
                                <div className="flex items-start justify-between gap-3 mb-5">
                                  <div className="flex items-center gap-2">
                                    {taskItem.isPriority ? (
                                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                                        Priority
                                      </span>
                                    ) : (
                                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${badgeShell}`}>
                                        Normal
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => deleteTask(taskItem._id)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 active:scale-[0.96]"
                                    aria-label={`Delete ${taskItem.title}`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <h3
                                  className={`text-lg sm:text-xl font-semibold break-words mb-4 ${
                                    taskItem.isDone
                                      ? "line-through text-slate-400"
                                      : darkMode
                                      ? "text-slate-900"
                                      : "text-white"
                                  }`}
                                >
                                  {taskItem.title}
                                </h3>

                                <div className="space-y-3 mb-6">
                                  {taskItem.dueDate ? (
                                    <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
                                      <CalendarDays className="w-4 h-4 text-cyan-300" />
                                      <span>Due Date: {new Date(taskItem.dueDate).toLocaleDateString()}</span>
                                    </div>
                                  ) : (
                                    <div className={`flex items-center gap-2 text-sm ${lightMutedText}`}>
                                      <CalendarDays className="w-4 h-4" />
                                      <span>No due date set</span>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-2 text-sm">
                                    <CircleCheckBig
                                      className={`w-4 h-4 ${taskItem.isDone ? "text-emerald-400" : lightMutedText}`}
                                    />
                                    <span className={taskItem.isDone ? "text-emerald-400" : mutedText}>
                                      {taskItem.isDone ? "Completed task" : "Pending task"}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  className={`w-full rounded-2xl p-3.5 font-semibold text-white transition-all duration-300 active:scale-[0.98] ${
                                    taskItem.isDone
                                      ? "bg-emerald-500 hover:bg-emerald-400"
                                      : "bg-cyan-500 hover:bg-cyan-400"
                                  }`}
                                  onClick={() => toggleTask(taskItem._id, taskItem.isDone)}
                                >
                                  {taskItem.isDone ? "Completed" : "Mark Complete"}
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}