import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AuthCard } from '../components/AuthCard'
import { Toaster } from 'react-hot-toast';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setformData] = useState({
    username:"",
    email:"",
    password:""
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const inputName=e.target.name;
    const inputValue=e.target.value;
    setformData({...formData,[inputName]:inputValue})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const response= await axios.post("http://localhost:5000/api/auth/register",formData,{
        withCredentials:true
      })
      toast.success("SignUp Successful")
      navigate("/dashboard")

      console.log(response.data)
    }catch(error){
      toast.error("SignUp Failed")
      console.log(error.message)
    }
  }
  return (
    <>
     <Toaster position="top-right" reverse={false}/>
    <AuthCard>

    <div>
      <h1 className='text-2xl font-bold text-center mb-4'>Welcome to our app</h1>
      <h2 className='text-lg font-bold text-center mb-4'>Please SignUp</h2>
      <form className='flex items-center flex-col justify-center ' onSubmit={handleSubmit}>
        
        <input className='border w-full p-3 rounded-lg mb-4' type="text" name='username' id='username' placeholder='Enter Your username' value={formData.username} onChange={handleChange} />
        <input className='border w-full p-3 rounded-lg mb-4' type="email" name='email' id='email' placeholder='Enter Your email' value={formData.email} onChange={handleChange} />
        <input className='border w-full p-3 rounded-lg mb-4' type="password" name='password' id='password' placeholder='Enter Your password' value={formData.password} onChange={handleChange} />
        <button className='bg-blue-500 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-600   cursor-pointer' type='submit'>signup</button>
        
      </form>
    </div>
    </AuthCard> 
    </>
  )
}
