import React from 'react'
import Navbar from '../components/Navbar'
import {useNavigate} from "react-router-dom"


export default function Home({user}) {
  const navigate=useNavigate();
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-gray-900 text-white'>
      <div>
        <Navbar user={user}/>
      </div>
      <div>
        <button onClick={()=>navigate("/dashboard")}>Go to Dashboard</button>
        {/* <button onClick={}>Logout</button> */}
      </div>
      Home</div>
  )
}
