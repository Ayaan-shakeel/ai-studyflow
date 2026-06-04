import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import Card from '../components/Card';
import { Toaster } from 'react-hot-toast';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Subjects({user}) {
  const [subject, setsubject] = useState([]);
  const [formData, setformData] = useState({
    name:""
  });
  useEffect(()=>{
    const fetchSubjects=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/subjects/get-subjects",{
          withCredentials:true
        });
        if(res.data.status===1){
          setsubject(res.data.subjects)
          console.log(res.data.subjects)
        }
      }catch(error){
        console.log(error);
      }
    }
    fetchSubjects();
  },[])
  const handleSubmit=async(e)=>{
e.preventDefault();
try{
  const res=await axios.post("http://localhost:5000/api/subjects/create-subject",formData,{
    withCredentials:true
  });
  if(res.data.status===1){
    toast.success("Subject Added Successfully")
    setsubject([res.data.subject,...subject])
    setformData({name:""})
  }
  
} catch(error){
  toast.error("Subject Add Failed")
  console.log(error);
}
  }
  const deleteSubject=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:5000/api/subjects/delete-subject/${id}`,{
        withCredentials:true
      })
      if(res.data.status===1){
        toast.success("Subject Deleted Successfully")
        setsubject(subject.filter(subject=>subject._id!==id))
        console.log(subject.filter(subject=>subject._id!==id))
      }
    }catch(error){
      toast.error("Subject Delete Failed")
      console.log(error);
    }
  }
  return (
  <>
 <Toaster position="top-right" reverse={false}/>
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1'>
        <Navbar user={user}/>
      <div className='bg-linear-to-br from-slate-900 via-blue-950 to-cyan-800 text-white min-h-screen'>

      <h1 className='font-bold lg:text-3xl md:text-2xl sm:text-2xl text-center pt-10 mb-5 '>Subjects</h1>
      <form  className='flex justify-center items-center'  onSubmit={handleSubmit}>
        <div className='flex justify-center items-center flex-col rounded-xl lg:w-[50%] transition-all duration-300 mb-15 p-5 bg-linear-to-br from-purple-500 to-pink-700'>

        <input className="bg-white text-black outline-none w-full py-2 rounded px-2" type="text" name='name' id='name' placeholder='Enter your subject name' value={formData.name} onChange={(e)=>setformData({...formData,name:e.target.value})}/>
        <button className='bg-linear-to-br from-blue-700 via-cyan-500 to-purple-200 hover:from-blue-800 hover:to-teal-500 text-white font-bold py-2 px-4 rounded-lg mt-6' type='submit'>add subject</button>
        </div>

      </form>
      {subject.map((subject)=>(
        <div key={subject._id}>
          <Card>

          <h1>{subject.name}</h1>
          <button onClick={()=>deleteSubject(subject._id)}>Delete Subject</button>
          </Card>
        </div>
      ))}
          </div>

      </div>
    </div>
    </>
  )
}
