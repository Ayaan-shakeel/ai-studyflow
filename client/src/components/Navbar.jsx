import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({user}) {
  
  return (
    <div className='flex items-center justify-between text-white font-semibold bg-linear-to-r from-blue-400 via-purple-200 to-lime-500 p-4'>
        <div className='flex items-center gap-2'>
       <img src="client/src/assets/logo.png" alt="logo" />
        <h1>Study Flow</h1>
        </div>

        <Link to="/">Home</Link>
        <h1>{user?.username}</h1>

    </div>
  )
}
