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
      
      <h1 className='font-bold lg:text-3xl md:text-2xl sm:text-2xl text-center '>Subjects</h1>
      <form onSubmit={handleSubmit}>
        <div>

        <input type="text" name='name' id='name' placeholder='Enter your subject name' value={formData.name} onChange={(e)=>setformData({...formData,name:e.target.value})}/>
        </div>
        <button type='submit'>add subject</button>

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
    </>
  )
}
