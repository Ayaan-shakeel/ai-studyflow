import React, { useState , useRef} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import {SendHorizontal} from 'lucide-react'

export default function AIStudy({ user }) {
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
     const textareaRef = useRef(null);

  const handleChange = (e) => {
    setPrompt(e.target.value);

    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
    const generateNotes = async () => {
        try {
            if (!prompt.trim()) {
                return toast.error("Please enter a prompt")
            }


            const res = await axios.post("http://localhost:5000/api/ai-study/generate-ai-notes", {
                prompt
            },
                {
                    withCredentials: true
                }
            )

            if (res.data.status === 1) {

                setResponse(res.data.response)
                console.log(res.data.message)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const generateQuiz = async () => {
        try {
            if (!prompt.trim()) {
                return toast.error("Please enter a prompt")
            }
            const res = await axios.post("http://localhost:5000/api/ai-study/generate-ai-quiz", {
                prompt
            },
                {
                    withCredentials: true
                }
            )

            if (res.data.status === 1) {

                setResponse(res.data.message)
                console.log(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const sendMessage = async () => {
        try {
            if (!prompt.trim()) {
                return toast.error("Please enter a prompt")
            }
            const res = await axios.post("http://localhost:5000/api/ai-study/send-ai-message", {
                prompt
            },
                {
                    withCredentials: true
                })
            if (res.data.status === 1) {
                setResponse(res.data.response)
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Toaster position='top-right reverseOrder={false}' />
            <div className="bg-linear-to-br from-slate-900 via-blue-950 to-cyan-800 text-white">
                <div>
                    <Navbar user={user} />
                </div>
                <h1 className="text-center mt-6  font-bold text-4xl">AI Study</h1>
                <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
                    <h1 className="text-center mb-5 font-bold text-4xl">
                        AI Study Assistant
                    </h1>
                  
                <div className="mt-4 flex w-full justify-center px-3 sm:px-4">
  <div className="relative w-full md:w-[70%] lg:w-[50%]">
    <textarea
      className="w-full min-h-[120px] resize-none rounded-2xl bg-white p-4 pr-16 text-base text-black outline-none shadow-md placeholder:text-gray-500 sm:text-lg"
      placeholder="Ask Anything ..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    
    <button
      type="button"
      onClick={sendMessage}
      className="absolute bottom-3 top-8 right-3 flex h-11 w-11 items-center justify-center rounded-xl  text-black shadow-lg transition-all duration-300  active:scale-95 sm:h-12 sm:w-12"
    >
      <SendHorizontal size={20} />
    </button>
  </div>
</div>
                    <button onClick={generateNotes} className=" mt-5 mb-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-2xl hover:shadow-2xl  hover:shadow-indigo-500 text-xl ">Generate Notes</button>
                    <button onClick={generateQuiz} className="mb-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-2xl hover:shadow-2xl  hover:shadow-indigo-500 text-xl " >Generate Quiz</button>
                        </div>
                    <div className='flex items-center justify-center mt-5 mb-5'>
                        <div className='bg-slate-800 rounded-xl lg:w-[50%] md:w-[70%] w-[90%] p-4  '>
                            <h1 className='text-center font-bold text-4xl mb-6'>AI Response</h1>
                          <p className="text-xl whitespace-pre-wrap mt-2 text-gray-300 font-light gap-4 ">

                            {response || "AI response will appear Here"}
                          </p>
                    </div>
                </div>



            </div>
        </>
    )
}
