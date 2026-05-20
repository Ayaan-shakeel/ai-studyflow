import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Notes from './pages/Notes'
import Subjects from './pages/Subjects'

export default function App() {
  return (
    <div>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/notes' element={<Notes/>}/>
  <Route path='/subjects' element={<Subjects/>}/>
</Routes>

    </div>
  )
}
