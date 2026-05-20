import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Signup() {
  const [formData, setformData] = useState({
    username:"",
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
      const response= await axios.post("http://localhost:5000/api/auth/register",formData,{
        withCredentials:true
      })
      console.log(response.data)
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <div>
      <h1>Welcome to our app</h1>
      <h2>Please SignUp</h2>
      <form onSubmit={handleSubmit}>
        
        <input className='' type="text" name='username' id='username' placeholder='Enter Your username' value={formData.username} onChange={handleChange} />
        <input type="email" name='email' id='email' placeholder='Enter Your email' value={formData.email} onChange={handleChange} />
        <input type="password" name='password' id='password' placeholder='Enter Your password' value={formData.password} onChange={handleChange} />
      <button type='submit'>signup</button>
        
      </form>
    </div>
  )
}
