import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
</Routes>

    </div>
  )
}
