import axios from 'axios';
import React from 'react'
import { useState } from 'react'

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
    <div>
      <h1>Welcome Back </h1>
      <h3>Login</h3>
   <form onSubmit={handleSubmit}>
    <input type="email" name="email" id="email" placeholder='Enter Your email' value={formData.email} onChange={handleChange} />
    <input type="password" name="password" id="password" placeholder='Enter Your password' value={formData.password} onChange={handleChange} />
    <button type='submit'>Login</button>
   </form>
    </div>
  )
}
