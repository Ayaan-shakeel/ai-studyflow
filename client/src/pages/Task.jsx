import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Card from '../components/Card'
import { Star } from 'lucide-react'
import { AuthCard } from '../components/AuthCard'
import { TaskCard } from '../components/TaskCard'
import { Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Task({user}) {
    const [task, setTask] = useState([])
    const [formData, setFormData] = useState({
        title:'',
        dueDate:'',
        isPriority:false,
        isDone:false

    })
    const [search, setSearch] = useState('');
    const [filter,setFilter]=useState('all')
    useEffect(()=>{
      const fetchTasks=async()=>{
        try{
          const res=await axios.get("http://localhost:5000/api/tasks/get-tasks",{
            withCredentials:true
          })
          if(res.data.status===1){
            setTask(res.data.tasks)
          }
        }
        catch(error){
          console.log(error)
        }
      }
      fetchTasks()
    },[]);

    const location=useLocation();
    useEffect(()=>{
if(location.state?.filter){
  setFilter(location.state.filter)
}
    },[])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:5000/api/tasks/create-task",formData,{
        withCredentials:true
    })
    if(res.data.status===1){
      toast.success("Task Added Successfully")
      setTask([res.data.task,...task]);
      setFormData({title:'',dueDate:'',isPriority:false,isDone:false})
    }
    }catch(error){
      toast.error("Create Task Failed")
      console.log(error)
  }
}
const toggleTask=async(id,currentStatus)=>{
  try{
    const res=await axios.put(`http://localhost:5000/api/tasks/update-task/${id}`,
      {isDone:!currentStatus},{
      withCredentials:true
  })
  if(res.data.status===1){
    setTask(task.map((t)=>t._id===id?{...t,isDone:!currentStatus}:t))
  }
  } catch(error){
    console.log(error)
  }
}
const deleteTask=async(id)=>{
  try{
    const res=await axios.delete(`http://localhost:5000/api/tasks/delete-task/${id}`,{
      withCredentials:true
  })
  if(res.data.status===1){
    toast.success("Task Deleted Successfully")
    setTask(task.filter(task=>task._id!==id))
    console.log(task.filter(task=>task._id!==id))
  }
}catch(error){
  toast.error("Task Delete Failed")
  console.log(error)
}
}
const filteredTasks=task.filter((task)=>{
  const matchesSearch= task.title.toLowerCase().includes(search.toLowerCase());
  if(filter==='completed'){
    return matchesSearch && task.isDone
    
  };
  if(filter==='pending'){
    return matchesSearch && !task.isDone
     
  };
  if(filter==='priority'){
    return matchesSearch && task.isPriority
     
  };
  return matchesSearch;
})

  return (
    <>
    <Toaster position="top-right" reverse={false}/>
    <div className=' min-h-screen bg-linear-to-br from-blue-950 via-slate-900 to-gray-800'>
      <div>
        <Navbar user={user}/>
      </div>
      <TaskCard>

        <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
        <h1 className='font-bold text-cyan-600 text-3xl mb-5'>Task</h1>
        <div>

          <input className='bg-white w-full p-2 text-center text-black rounded-xl' type="text" placeholder="Enter Task" name="title" id="title" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} />
        </div>
        <div>
      <label className='text-black'>Due Date : </label>
          <input className='border-none bg-white rounded-xl mt-6' type="Date"  name="dueDate" id="dueDate" value={formData.dueDate} onChange={(e)=>setFormData({...formData,dueDate:e.target.value})} />
        </div>
        <div> 
          <input className='mt-5' type="checkbox"  name="isPriority" id="isPriority" checked={formData.isPriority} onChange={(e)=>setFormData({...formData,isPriority:e.target.checked})} />
          <label className="text-black mt-5" htmlFor="priority"> : isPriority</label>
        </div>
        <div>
          <button className='bg-linear-to-br from-blue-400 via-pink-200  to-purple-500 w-full p-2 mt-4 rounded-xl' type="submit">Add Task</button>
        </div>
        </form>
        </TaskCard>
        <div className='flex justify-center mb-5'>
          <input className='w-[90%] md:w-[60%] lg:w-[40%] rounded-xl bg-white text-black outline-none p-3' type="search" placeholder='Search Tasks ....' name="search" id="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div className='flex flex-wrap justify-center mb-6  gap-4 '>
<button className={` rounded-xl  py-2 px-5 border-2 transition-all duration-300  ${filter==="all" ? "bg-amber-300 text-white border-amber-500 hover:bg-amber-600  ": "bg-emerald-100 text-emerald-300 border-black hover:bg-white "}`} onClick={()=>setFilter('all')}>All</button>
<button  className={` rounded-xl  py-2 px-5 border-2  transition-all duration-300 ${filter==="completed" ? "bg-amber-300 text-white border-amber-500 hover:bg-amber-600  ": "bg-emerald-100 text-emerald-300 border-black hover:bg-white "}`} onClick={()=>setFilter('completed')}>Completed</button>
<button   className={` rounded-xl  py-2 px-5 border-2 transition-all duration-300  ${filter==="pending" ? "bg-amber-300 text-white border-amber-500 hover:bg-amber-600  ": "bg-emerald-100 text-emerald-300 border-black hover:bg-white "}`} onClick={()=>setFilter('pending')}>Pending</button>
<button  className={` rounded-xl  py-2 px-5 border-2  transition-all duration-300 ${filter==="priority" ? "bg-amber-300 text-white border-amber-500 hover:bg-amber-600  ": "bg-emerald-100 text-emerald-300 border-black hover:bg-white "}`} onClick={()=>setFilter('priority')}>Priority</button>
        </div>
<div>
  {task.length=== 0 ? (<h1 className='text-3xl font-bold text-center text-emerald-500 text-underline mb-8 mt-4'>No Task Yet</h1>
):(
  <>
<h1 className='text-3xl font-bold text-center text-emerald-500 text-underline mb-8 mt-4'>Tasks List</h1>
  <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5 text-center'>
        {filteredTasks.map((task)=>(
          <div key={task._id}>
<Card>


          <div className=" flex items-center justify-between mb-5 gap-2 font-bold text-red-500"> {task.isPriority &&  <Star size={18}/>}
<button onClick={()=>deleteTask(task._id)}><Trash2 size={18} /></button>
          </div>
          <h1 className={`text-xl text-lime-100 mb-5 font-bold ${task.isDone ? "line-through text-gray-400" :"text-black"}`}>{task.title}</h1>

          {task.dueDate && <h2 className="font-semibold mb-5">Due Date : {""}{
            new Date(task.dueDate).toLocaleDateString()}</h2>}
         <button className={`mb-3 w-full  transition-all duration-300 text-white rounded-xl p-4 font-semibold ${task.isDone ? "bg-teal-500 hover:bg-teal-300" : "bg-cyan-500 hover:bg-cyan-300"}`} onClick={()=>toggleTask(task._id,task.isDone)}>{task.isDone?"Completed":"Mark Complete"}</button>
</Card>
        </div>
        ))}
        </div>
    </>
  )}
  </div>
    </div>
  </>
  )
}
