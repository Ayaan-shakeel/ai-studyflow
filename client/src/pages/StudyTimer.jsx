import React, { useEffect, useState } from 'react'
import { TimerCard } from '../components/TimerCard'
import Navbar from '../components/Navbar'

export default function StudyTimer({user}) {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(25)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState("Pomodoro")
    const [sessions, setSessions] = useState(0)
    useEffect(()=>{
        let interval=null
        if(isActive){
            interval=setInterval(()=>{
                if(seconds>0){
                    setSeconds(seconds=>seconds-1)
                }
                else if(minutes>0){
                    setMinutes(minutes=>minutes-1)
                    setSeconds(59)
                }
                else{
                    setIsActive(false)
                    if(mode==="Pomodoro"){
                     setSessions(prev=>prev+1)
                    }
                }
            },1000)
        } return ()=>clearInterval(interval)
        },[isActive,seconds,minutes]);

        const changeMode=(newMode,newMinutes)=>{
            setMode(newMode)
            setMinutes(newMinutes)
            setSeconds(0)
            setIsActive(false)
        }
  return (
    <div>
        <div>
            <Navbar user={user}/>
        </div>
        <TimerCard>

        <div>
            <h1 className='text-center font-bold text-3xl sm:text-2xl'>Study Session  Timer</h1>
        </div>
        <div flex className='flex justify-center items-center gap-3 w-full mb-5 mt-5 transition-all duration-300 ease-in-out'>
            <button className={`${mode === "Pomodoro" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"} px-2 py-2 rounded-xl font-semibold transition-all duration-300 text-xl`} onClick={()=>changeMode("Pomodoro",25)}>Pomodoro</button>
            <button className={`${mode === "Short Break" ? "bg-green-500 text-white" : "bg-gray-200 text-black"} px-2 py-2 rounded-xl font-semibold transition-all duration-300 text-xl`} onClick={()=>changeMode("Short Break",5)}>Short Break</button>
            <button className={`${mode === "Long Break" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} px-2 py-2 rounded-xl font-semibold transition-all duration-300 text-xl`} onClick={()=>changeMode("Long Break",15)}>Long Break</button>
        </div>
        <div>
            <h1 className='text-white font-semibold text-center text-2xl sm:text-xl '>Sessions completed : {sessions}</h1>
        </div>
        <div className='flex justify-center items-center w-full mb-5 mt-5 transition-all duration-300 ease-in-out'>
<h1 className='border-2 border-lime-400 flex items-center justify-center text-center text-3xl font-extrabold rounded-full h-32 w-32 text-shadow-amber-200 bg-linear-to-br from-cyan-300 p-2 via-pink-400 to-purple-200 hover:border-white '>{minutes}:{seconds < 10 ? `0${seconds}`:seconds}</h1>
        </div>
        <div className='flex flex-col  justify-center items-center mb-5 mt-5 transition-all duration-300 ease-in-out'>
        <div className='flex items-center justify-center w-full mb-5 mt-5'>
<button className='bg-linear-to-br from-orange-500  to-pink-500 w-full hover:brightness-110 hover:from-orange-600 hover:to-pink-600  text-white font-bold py-2 px-4 cursor-pointer transition-all duration-300 rounded-xl' onClick={()=>setIsActive(true)}>Start</button>

        </div>
        <div className='flex items-center justify-center w-full mb-5 mt-5'>
<button className='bg-linear-to-br from-purple-600 to-indigo-600 w-full hover:brightness-110 hover:from-purple-700 hover:to-indigo-700  text-white font-bold py-2 px-4 cursor-pointer transition-all duration-300 rounded-xl' onClick={()=>setIsActive(false)}>Pause</button>

        </div>
        <div className='flex items-center justify-center w-full mb-5 mt-5'>
<button className='bg-linear-to-br from-slate-700 to-slate-800 w-full hover:brightness-110 hover:from-slate-600 hover:to-slate-700  text-gray-300 font-bold py-2 px-4 cursor-pointer transition-all duration-300 rounded-xl' onClick={()=>{setIsActive(false);setMinutes(25);setSeconds(0)}}>Reset</button>
        </div>
    </div>
        </TimerCard>
        </div>
  )
}
