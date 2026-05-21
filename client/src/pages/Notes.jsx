import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Notes() {
  const [user, setuser] = useState(null);
  const [notes, setnotes] = useState([]);
  const [formData, setformData] = useState({
    title:"",
    content:""
  });

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
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:5000/api/notes/create-notes",formData,{
        withCredentials:true
      })
      if(res.data.status===1){
        setnotes([res.data.note,...notes])
        setformData({title:"",content:""})
      }
    }catch(error){
      console.log(error);
    }
    }
    const deleteNote=async(id)=>{
      try{
        const res=await axios.delete(`http://localhost:5000/api/notes/delete-notes/${id}`,{
          withCredentials:true
        })
        if(res.data.status===1){
          setnotes(notes.filter(note=>note._id!==id))
        }
      }catch(error){
        console.log(error);
      }
    }
  return (
    <div>
       <div className='flex'>
            <Sidebar/>
            <div className='flex-1'>
             <Navbar user={user}/>


    
            
<div>
 <h1>Notes</h1>
 <form onSubmit={handleSubmit}>
  <input type="text" name='title' id='title' placeholder='enter title' value={formData.title} onChange={(e)=>setformData({...formData, title:e.target.value})} />
  <input type="text" name='content' id='content' placeholder='Enter the content' value={formData.content} onChange={(e)=>setformData({...formData, content:e.target.value})} />
  <button type='submit'>Add Note</button>
 </form>
</div>
{notes.map((note)=>(
  <div key={note._id}>
    <Card>

   <h1>{note.title}</h1>
   <p>{note.content}</p>

   <button onClick={()=>deleteNote(note._id)}>Delete</button  >
    </Card>
   </div>
))}
             </div>
      
    </div>
            
    </div>
  )
}
