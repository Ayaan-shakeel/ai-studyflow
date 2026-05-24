import React from 'react'
import Navbar from '../components/Navbar'

export default function Home({user}) {
  return (
    <div>
      <div>
        <Navbar user={user}/>
      </div>
      Home</div>
  )
}
