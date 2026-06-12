import React, { useRef, useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {
  SendHorizontal,
  Sparkles,
  FileText,
  Brain,
  Bot,
  Wand2,
  ClipboardList,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import Sidebar from '../components/Sidebar';

export default function AIStudy({ user }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [subjectId,setSubjectId]=useState("")
  const [subjects,setSubjects]=useState([])
  const textareaRef = useRef(null);
  const { darkMode } = useTheme();
  useEffect(()=>{
const fetchSubjects=async()=>{
  try{
    const res=await axios.get("http://localhost:5000/api/subjects/get-subjects",
      {withCredentials:true})
      if(res.data.status===1){
        setSubjects(res.data.subjects)
      }
  }catch(error){
    console.log(error.message)
  }
}
fetchSubjects()
  },[])

  const handleChange = (e) => {
    setPrompt(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const generateNotes = async () => {
    try {
      if (!prompt.trim()) {
        return toast.error("Please enter a prompt");
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai-study/generate-ai-notes",
        { prompt },
        { withCredentials: true }
      );

      if (res.data.status === 1) {
        setResponse(res.data.response);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate notes");
    } finally {
      setLoading(false);
    }
  };

  const generateQuiz = async () => {
    try {
      if (!prompt.trim()) {
        return toast.error("Please enter a prompt");
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai-study/generate-ai-quiz",
        { prompt },
        { withCredentials: true }
      );

      if (res.data.status === 1) {
        setResponse(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    try {
      if (!prompt.trim()) {
        return toast.error("Please enter a prompt");
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai-study/send-ai-message",
        { prompt },
        { withCredentials: true }
      );

      if (res.data.status === 1) {
        setResponse(res.data.response);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  const saveAiNote=async()=>{
    try{
      const res=await axios.post("http://localhost:5000/api/ai-study/save-ai-note",
        {title:prompt,content:response,subjectId:subjectId},
     {
       withCredentials:true
     } )
      if(res.data.status===1){
        toast.success("AI Note Saved Successfully")
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(error){ 
      console.log(error.message)
      toast.error("Failed to save AI Note")
    }
  }

  // REVERSED TO MATCH YOUR APP LOGIC
  const pageClasses = darkMode
    ? "min-h-screen bg-slate-50 text-slate-900"
    : "min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white";

  const panelClasses = darkMode
    ? "border border-slate-200 bg-white shadow-sm"
    : "border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.24)]";

  const softPanelClasses = darkMode
    ? "border border-slate-200 bg-slate-50"
    : "border border-white/10 bg-slate-950/50";

  const titleText = darkMode ? "text-slate-900" : "text-white";
  const mutedText = darkMode ? "text-slate-600" : "text-slate-300";
  const faintText = darkMode ? "text-slate-500" : "text-slate-400";

  const inputClasses = darkMode
    ? "border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-cyan-500/40"
    : "border border-white/10 bg-slate-950/60 text-white placeholder:text-slate-400 focus:ring-cyan-500/70";

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={pageClasses}>
        <div className="flex">
<Sidebar/>
        <div className="flex-1">
        <Navbar user={user} />

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
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 ${
                    darkMode
                      ? "border border-slate-200 bg-slate-100 text-slate-700"
                      : "border border-white/10 bg-white/5 text-slate-300"
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    AI powered study workspace
                  </div>

                  <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${titleText}`}>
                    AI Study Assistant
                  </h1>

                  <p className={`mt-3 text-sm sm:text-base ${mutedText}`}>
                    Ask questions, generate notes, or create quizzes from any topic in one place.
                  </p>
                </div>

                <div className={`rounded-2xl px-4 py-3 min-w-[180px] ${
                  darkMode
                    ? "border border-slate-200 bg-slate-50"
                    : "border border-white/10 bg-white/5"
                }`}>
                  <p className={`text-xs uppercase tracking-[0.2em] ${faintText}`}>
                    Assistant Status
                  </p>
                  <p className={`mt-2 text-lg font-semibold ${loading ? "text-amber-500" : "text-emerald-500"}`}>
                    {loading ? "Working..." : "Ready"}
                  </p>
                </div>
              </div>
            </motion.section>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className={`xl:col-span-3 rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`rounded-2xl p-3 ${
                    darkMode
                      ? "border border-cyan-200 bg-cyan-50"
                      : "border border-cyan-400/20 bg-cyan-500/10"
                  }`}>
                    <Bot className={`w-5 h-5 ${darkMode ? "text-cyan-600" : "text-cyan-300"}`} />
                  </div>
                  <div>
                    <h2 className={`text-lg sm:text-xl font-semibold ${titleText}`}>
                      Ask anything
                    </h2>
                    <p className={`text-sm ${mutedText}`}>
                      Enter a topic, doubt, or study request below.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    className={`w-full min-h-[140px] max-h-[320px] resize-none overflow-y-auto rounded-3xl p-4 pr-16 text-base outline-none shadow-md focus:ring-2 sm:text-lg ${inputClasses}`}
                    placeholder="Ask anything... for example: Explain the human heart in simple notes, generate a quiz on JavaScript closures, or summarize photosynthesis."
                    value={prompt}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={loading}
                    className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:bg-cyan-400 active:scale-[0.96] disabled:opacity-60"
                    aria-label="Send message"
                  >
                    <SendHorizontal size={18} />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-cyan-950/30 disabled:opacity-60"
                  >
                    <Wand2 className="w-4 h-4" />
                    Chat
                  </button>

                  <button
                    onClick={generateNotes}
                    disabled={loading}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-blue-950/30 disabled:opacity-60"
                  >
                    <FileText className="w-4 h-4" />
                    Generate Notes
                  </button>
<select value={subjectId} onChange={(e)=>setSubjectId(e.target.value)}>
  <option value="">Select Subject</option>
  {subjects.map((subject)=>{
    return <option key={subject._id} value={subject._id}>{subject.name}</option>
  })}
</select>
<button type="button" onClick={saveAiNote}>Save to Note</button>
                  <button
                    onClick={generateQuiz}
                    disabled={loading}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-violet-500 px-4 py-3 font-semibold text-white hover:bg-violet-400 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-violet-950/30 disabled:opacity-60"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Generate Quiz
                  </button>
                </div>
              </motion.section>

              <motion.aside
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className={`xl:col-span-2 rounded-3xl p-5 sm:p-6 ${panelClasses}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`rounded-2xl p-3 ${
                    darkMode
                      ? "border border-emerald-200 bg-emerald-50"
                      : "border border-emerald-400/20 bg-emerald-500/10"
                  }`}>
                    <Brain className={`w-5 h-5 ${darkMode ? "text-emerald-600" : "text-emerald-300"}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${titleText}`}>Quick tips</h3>
                    <p className={`text-sm ${mutedText}`}>
                      Better prompts give better answers.
                    </p>
                  </div>
                </div>

                <div className={`space-y-4 text-sm ${mutedText}`}>
                  <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                    Ask for a format like “short notes,” “bullet summary,” or “MCQ quiz.”
                  </div>
                  <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                    Mention class level or difficulty, for example “for 12th standard” or “beginner level.”
                  </div>
                  <div className={`rounded-2xl p-4 ${softPanelClasses}`}>
                    For coding topics, ask for examples, edge cases, or interview-style questions.
                  </div>
                </div>
              </motion.aside>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-3xl p-5 sm:p-6 lg:p-8 ${panelClasses}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`rounded-2xl p-3 ${
                  darkMode
                    ? "border border-amber-200 bg-amber-50"
                    : "border border-amber-400/20 bg-amber-500/10"
                }`}>
                  <FileText className={`w-5 h-5 ${darkMode ? "text-amber-600" : "text-amber-300"}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl font-semibold ${titleText}`}>
                    AI Response
                  </h2>
                  <p className={`text-sm ${mutedText}`}>
                    Your generated result will appear here.
                  </p>
                </div>
              </div>

              <div className={`rounded-3xl p-4 sm:p-5 min-h-[260px] max-h-[520px] overflow-y-auto ${softPanelClasses}`}>
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className={`h-4 w-3/4 rounded ${darkMode ? "bg-slate-200" : "bg-white/10"}`} />
                    <div className={`h-4 w-full rounded ${darkMode ? "bg-slate-200" : "bg-white/10"}`} />
                    <div className={`h-4 w-5/6 rounded ${darkMode ? "bg-slate-200" : "bg-white/10"}`} />
                    <div className={`h-4 w-2/3 rounded ${darkMode ? "bg-slate-200" : "bg-white/10"}`} />
                  </div>
                ) : (
                  <p className={`whitespace-pre-wrap break-words text-sm sm:text-base leading-7 ${darkMode ? "text-slate-700" : "text-slate-200"}`}>
                    {response || "AI response will appear here."}
                  </p>
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