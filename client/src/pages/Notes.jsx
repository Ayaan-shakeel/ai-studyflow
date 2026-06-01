import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import NotesCard from '../components/NotesCard';
import { BookOpen } from 'lucide-react';
import NewCard from '../components/NewCard';
import { Toaster } from 'react-hot-toast';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Notes({children}) {
  const [user, setuser] = useState(null);
  const [notes, setnotes] = useState([]);
  const [formData, setformData] = useState({
    title:"",
    content:"",
    subjectId:""
  });
  const [subjects, setSubjects] = useState([])
  const [search, setSearch] = useState('');
  const [subjectFilter,setSubjectFilter] = useState("all")



  useEffect(()=>{
    const fetchNotes=async()=>{
      try{
        const response=await axios.get("http://localhost:5000/api/notes/get-notes",{
          withCredentials:true
        });
        if(response.data.status===1){
          setnotes(response.data.notes)
        }
      }catch(error){
        console.log(error);
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
      if(res.data.status===1){
        setSubjects(res.data.subjects)
        console.log(res.data.subjects)

      }
    } catch(error){
      console.log(error);
    }
  }
    fetchSubjects();
  },[]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:5000/api/notes/create-notes",formData,{
        withCredentials:true
      })
      if(res.data.status===1){
        toast.success("Note Added Successfully")

        setnotes([res.data.note,...notes])
        setformData({title:"",content:""})
      }
    }catch(error){
      toast.error("Create Note Failed")
      console.log(error);
    }
    }
    const deleteNote=async(id)=>{
      try{
        const res=await axios.delete(`http://localhost:5000/api/notes/delete-notes/${id}`,{
          withCredentials:true
        })
        if(res.data.status===1){
          toast.success("Note Deleted Successfully")
          setnotes(notes.filter(note=>note._id!==id))
        }
      }catch(error){
        toast.error("Note Delete Failed")
        console.log(error);
      }
    }
    const updateNote=async(id,title,content)=>{
      try{
        const res=await axios.put(`http://localhost:5000/api/notes/subjects/${id}`,{title,content},{
          withCredentials:true
      })
      if(res.data.status===1){
        setnotes(notes.map(note=>note._id===id?{...note,title,content}:note))
        console.log(notes)
      }
      }catch(error){
        console.log(error)
    }
  }
  const filteredNotes=notes.filter((note)=>{
    const matchesSearch= note.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject=subjectFilter==="all" || note.subjectId?._id ===subjectFilter;
   
    return matchesSearch && matchesSubject
  })
  return (
    <>
    <Toaster position="top-right" reverse={false}/>
    <div className='bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900'>
       {/* <div className='flex'>
            <Sidebar/> */}
            <div className='flex-1'>
             <Navbar user={user}/>


    <NotesCard>

            
<div className='flex flex-col justify-center items-center'>
  
 <h1 className='text-3xl font-bold text-center text-white mb-5'>Notes</h1>
 
 <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
  <div>
<input className='bg-white text-black  rounded-2xl w-full px-18 py-4 mb-5 text-wrap ' type="text" name='title' id='title' placeholder='enter title' value={formData.title} onChange={(e)=>setformData({...formData, title:e.target.value})} />
  </div>
<div>
<textarea className='bg-white text-black  rounded-2xl py-4 px-18 mb-5 text-wrap' type="text" name='content' id='content' placeholder='Enter the content' value={formData.content} onChange={(e)=>setformData({...formData, content:e.target.value})} rows={5} />
</div>
<div>
  <select  className='bg-white text-black  rounded-2xl py-4 px-18 mb-5 text-wrap' name="subjectId" id="subjectId" value={formData.subjectId} onChange={(e)=>setformData({...formData,subjectId:e.target.value})}>
    <option value="">Select Subject</option>
    {subjects.map((subject)=>(
      <option key={subject._id} value={subject._id}>{subject.name}</option>

    ))}
  </select>
</div>

<div className="w-full">
    <button className='bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white w-full rounded-xl p-4 font-semibold ' type='submit'>Add Note</button>
  </div>
 </form>
</div>
    </NotesCard>
    <div>
<div className='flex flex-col items-center gap-10 justify-center mb-5'>
  <input className=' w-[90%] lg:w-[40%] md:w-[60%] p-3 bg-white text-black rounded-xl outline-none ' type="search" placeholder='Search Notes . . . .' name="search" id="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
 <div>
  <select  className='bg-white text-black  rounded-2xl py-4 px-18 mb-5 text-wrap' name="subjectId" id="subjectId" value={subjectFilter} onChange={(e)=>setSubjectFilter(e.target.value)}>
    <option value="">All Subject</option>
    {subjects.map((subject)=>(
      <option key={subject._id} value={subject._id}>{subject.name}</option>

    ))}
  </select>
</div>
  </div>
<div>

      {notes.length === 0 ? (<h1 className='font-bold text-white text-center text-3xl mt-5 mb-5 '>No Notes Yet</h1>
    ) :(
      <>

      <div>
        <h1 className='text-lime-300 underline font-bold text-center text-3xl mt-5 mb-5'>Your Notes</h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5 text-center'>

{filteredNotes.map((note)=>(
  <div key={note._id}>
   

 <div className=''>
    <Card note={note} className='mt-4 flex justify-center'>
      <div className='flex gap-2'>
        <BookOpen/>
        <h2 className='font-bold text-white  mb-3 '>{note.subjectId?.name}</h2>
      </div>
   <h1 className='text-white text-center mb-7 font-semibold'>{note.title}</h1>
   <p>{note.content}</p>


   <button onClick={()=>deleteNote(note._id)}>Delete</button  >
   
    </Card>
    </div>
   </div>
))}
    </div>
    </> 
  )}
  </div>
    </div>
      
      </div>
    // </div>
            
    </>
    // </div>
  )
}
