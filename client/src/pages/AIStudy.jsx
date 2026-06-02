import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function AIStudy({user}) {
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    const generateNotes=async()=>{
        setPrompt(`Notes About: ${prompt}`)
    }
    const generateQuiz=async()=>{
        setPrompt(`Quiz Generated from: ${prompt}`)
    }
    const sendMessage=async()=>{
        setPrompt(`Sending Message to AI: ${prompt}`)
    }
  return (
    <div className="bg-linear-to-br from-slate-900 via-blue-950 to-cyan-800 text-white">
        <div>
            <Navbar user={user}/>
        </div>
        <h1 className="text-center mt-6  font-bold text-4xl">AI Study</h1>
        <div className=" min-h-screen flex flex-col items-center justify-center gap-5">
           <h1 className="text-center mb-5 font-bold text-4xl">
            AI Study Assistant
            </h1> 
            <textarea className='lg:w-[50%] p-4 w-[90%] md:w-[70%] rounded-xl bg-white text-black text-xl outline-none  ' name="" id="" placeholder='Ask Anything ...' value={prompt} onChange={(e)=>setPrompt(e.target.value)}></textarea>
            <button onClick={generateNotes} className=" mt-5 mb-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-2xl hover:shadow-2xl  hover:shadow-indigo-500 text-xl ">Generate Notes</button>
            <button onClick={generateQuiz} className="mb-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-2xl hover:shadow-2xl  hover:shadow-indigo-500 text-xl " >Generate Quiz</button>
            <button onClick={sendMessage} className=" mb-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-2xl hover:shadow-2xl  hover:shadow-indigo-500 text-xl ">Send</button>
            <div>
                <div>
                    {response || "AI response will appear Here"}
                </div>
            </div>
            </div>



    </div>
  )
}
