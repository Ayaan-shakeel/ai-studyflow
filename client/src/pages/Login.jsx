import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { AuthCard } from '../components/AuthCard';

export default function Login() {
  const [formData, setformData] = useState({
    email:"",
    password:""
  })
const handleChange=(e)=>{
  const inputName=e.target.name;
  const inputValue=e.target.value;
  setformData({...formData,[inputName]:inputValue})
  
}
const handleSubmit= async(e)=>{
  e.preventDefault();
  try{
    const response= await axios.post("http://localhost:5000/api/auth/login",formData,{
      withCredentials:true
    })
    console.log(response.data)
  }catch(error){
    console.log(error.message)
  }
}
  return (
    <AuthCard>

    <div>
      <h1 className='text-2xl text-center  font-bold mb-4'>Welcome Back </h1>
      <h3 className='text-lg text-center font-semibold mb-4'>Login</h3>
   <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
    <input className='border w-full p-3 rounded-lg mb-4 ' type="email" name="email" id="email" placeholder='Enter Your email' value={formData.email} onChange={handleChange} />
    <input className='border w-full p-3 rounded-lg mb-4 ' type="password" name="password" id="password" placeholder='Enter Your password' value={formData.password} onChange={handleChange} />
    <button className='bg-blue-500 text-white py-2 px-4 w-full cursor-pointer rounded-lg hover:bg-blue-600' type='submit'>Login</button>
   </form>
    </div>
    </AuthCard>
  )
}
