import React from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


export default function Dashboard() {
  const [user, setuser] = useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/auth/profile",{
          withCredentials:true
        })
        setuser(res.data.user)  
        console.log(user.id)
      }catch(error){
        console.log(error.message)
        // navigate("/login")
      }
    }
    fetchProfile();
  },[])
  if(!user){
    return <h1>Loading...</h1>
  }
 
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1'>
       <Navbar user={user} />
     
      <h1 className='text-2xl text-center font-bold mb-4'>Welcome to Dashboard </h1>
      <Card>
        <h1>Dashboard Content</h1>
     <h2>{user?.id}</h2>
      </Card>
<Logout/>

      </div>

    </div>
  )
}
