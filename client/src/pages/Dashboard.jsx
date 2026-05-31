import React from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { AuthCard } from '../components/AuthCard';
import { CheckCircleIcon, FolderIcon, NotebookIcon, ClockIcon } from 'lucide-react';
import PageLoader from '../components/PageLoader';


export default function Dashboard() {
  const [user, setuser] = useState(null);
  const [notes, setnotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/auth/profile",{
          withCredentials:true
        })
        setuser(res.data.user)  
        // console.log(res.data.user?.id)
      }catch(error){
        console.log(error.message)
        navigate("/login")
      }
    }
    fetchProfile();
  },[])
  useEffect(()=>{
    const savedTheme=localStorage.getItem("theme")
    if(savedTheme !== null){
      setDarkMode(JSON.parse(savedTheme))
      // localStorage.setItem("theme",darkMode)
}
  },[])
  useEffect(()=>{
    
      const fetchNotes=async()=>{
        try{
          const res=await axios.get("http://localhost:5000/api/notes/get-notes",{
            withCredentials:true
          })
          if(res.data.notes){
            setnotes(res.data.notes)
          }

        }catch(error){
          console.log(error.message)
        }
      
    }
    fetchNotes();
  },[])

  useEffect(()=>{
    const fetchSubjects=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/subjects/get-subjects",{
          withCredentials:true
      })
      if(res.data.subjects){
        setSubjects(res.data.subjects)
      }
    }catch(error){
      console.log(error.message)
    }
  }
  fetchSubjects();
  },[])
  useEffect(()=>{
    const fetchTasks=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/tasks/get-tasks",{
          withCredentials:true
      })
      if(res.data.tasks){
        setTasks(res.data.tasks)
      }
    }catch(error){
      console.log(error.message)
    }
  }
  fetchTasks();
  },[])
const pendingTasks=tasks.filter(tasks=>!tasks.isDone)

const completedTasks=tasks.filter(tasks=>tasks.isDone).length
const pendingTask=tasks.filter(tasks=>!tasks.isDone).length

const completionRate= tasks.length? Math.round((completedTasks/tasks.length)*100):
0;
let message="";
if(completionRate===100){
  message ="Perfect! You have completed all your tasks. Good job!"

}else if(completionRate>60 && completionRate<100){
  message="Good progress! Keep it up"
}
else if(completionRate>1 && completionRate<60){
  message="Keep it up! You are almost there"
}else{
  message="Start Your Journey"
}
  if(!user){
    return <PageLoader/>
  }
 
  return (


<div className={darkMode ? "bg-white-950 text-black":"bg-linear-to-br from-slate-950 via-blue-950 to-gray-900 text-white" }>
<div className='flex min-h-screen'>

  
  {/* flex min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-gray-900 */}
      <Sidebar/>
      <div className='flex-1'>
       <Navbar user={user} />
     <div className='text-center text-3xl sm:text-2xl text-white mt-6 mb-7'>
<button className='bg-green-700' onClick={()=>setDarkMode(!darkMode)}>{darkMode?"LightMode":"DarkMode"}</button>
      <h1 className='text-4xl sm:text-3xl text-center text-white font-extrabold mt-10 mb-6'>Welcome Back, {user?.username} </h1>
      <p className='text-2xl font-semibold text-gray-300 mb-7'>
        Track your Productivity and study smarter
      </p>
     </div>
     
<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5 mb-5'>

      <Card onClick={()=>navigate("/notes")} className='hover:scale-105 transition-all duration-300'>
            <p className='text-white'><NotebookIcon size={28} /></p>
        <h1 className='font-bold text-2xl text-white text-center mb-6 '>Notes</h1>
        <p className='text-white text-center text-3xl  mb-3 font-semibold'>
            </p>
          {notes.length===0? (
          <div className='text-center text-white mt-10'>
            <h1 className='text-3xl font-bold'>No Notes Yet</h1>
            <p className='text-gray-300 mt-6 mb-3 '>Add some new notes for your studies</p>
          </div>):
          (
            <div className='text-center text-white mt-6'>
              <h1 className='text-3xl font-bold mb-2'>Total Notes</h1>
             <h1 className='text-3xl font-extrabold text-gray-300'>
              {notes.length}
              </h1>
            </div>
            )}
      </Card>
      <Card onClick={()=>navigate("/subjects")} className='hover:scale-105 transition-all duration-300'>
 

        <p className='text-white'><FolderIcon size={28}/></p>
        <h1 className='font-bold text-2xl text-white text-center mb-6 '>Subjects</h1>
       <p className='text-white text-center text-3xl  mb-3 font-extrabold' ></p>
       {subjects.length===0? (
          <div className='text-center text-white mt-10'>
            <h1 className='text-3xl font-bold'>No Subjects Yet</h1>
            <p className='text-gray-300 mt-6 mb-3 '>You have not created any subjects yet</p>
          </div>):
          (
            <div className='text-center text-white mt-6'>
              <h1 className='text-3xl font-bold mb-2'>Total Subjects</h1>
             <h1 className='text-3xl font-extrabold text-gray-300'>
              {subjects.length}
              
              </h1>
            </div>
            )}
      </Card>
      <Card onClick={()=>navigate("/task")} className='hover:scale-105 transition-all duration-300'>
        <p className='text-white'><CheckCircleIcon size={28}/></p>
        <h1 className='font-bold text-2xl text-white text-center mb-6 '>Tasks</h1>
        <p className='text-white text-center text-3xl  mb-3 font-extrabold'></p>
        {tasks.length===0? (
          <div className='text-center text-white mt-10'>
            <h1 className='text-3xl font-bold'>No Tasks Yet</h1>
            <p className='text-gray-300 mt-6 mb-3 '>Add a new task to stay productive</p>
          </div>):
          (
            <div className='text-center text-white mt-6'>
              <h1 className='text-3xl font-bold mb-2'>Total Tasks</h1>
             <h1 className='text-3xl font-extrabold text-gray-300'>
              {tasks.length}
             
              </h1>
            </div>
            )}
      </Card>
      <Card onClick={()=>navigate("/task",{state:{filter:"pending"}})} className='hover:scale-105 transition-all duration-300'>
        <p className='text-white'><ClockIcon size={28}/></p>
        <h1 className='font-bold text-2xl text-red-400 text-center mb-6 '>Pending Tasks</h1>
        <p className='text-white text-center text-3xl  mb-3 font-extrabold'></p>
        {pendingTasks.length===0? (
          <div className='text-center text-white mt-10'>
            <h1 className='text-3xl font-bold'>No Pending Tasks Yet</h1>
            <p className='text-gray-300 mt-6 mb-3 '>You have Successfully completed all your tasks</p>
          </div>):
          (
            <div className='text-center text-white mt-6'>
              {/* <h1 className='text-3xl font-bold mb-2'>Total Pending Tasks</h1> */}
             <h1 className='text-3xl font-extrabold text-gray-300'>
              {pendingTasks.length > 0 ? `You have ${pendingTasks.length} pending tasks to finish today`:"All tasks are completed. Great Work!"}
            
              </h1>
            </div>
            )}
      </Card>
        <Card>
      
        <div className='text-center text-white mt-6'>
          <h1 className=' text-3xl font-bold mb-6'>Completion Rate</h1>
          <div className='w-full bg-gray-700 h-3 mb-3 rounded-full'>

          <div className='bg-green-400 rounded-b-full h-3'
            style = {{width:`${completionRate}%`}}
            >

            </div>
              </div>
           


        <div className='text-center text-white mt-6'>
          <h1 className='text-3xl font-bold mb-2'>Completion Rate</h1>
          <h1>You are {completionRate}% Productive today</h1>
          <h2>{message}</h2>
        </div>
        </div>
        </Card>
      
</div>



      </div>

    </div>
            
</div>
  )
}
