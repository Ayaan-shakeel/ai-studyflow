import React from 'react'
import Home from './pages/Home'
import { Route, Routes,Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Notes from './pages/Notes'
import Subjects from './pages/Subjects'
import Task from './pages/Task'
import StudyTimer from './pages/StudyTimer'
import AIStudy from './pages/AIStudy'
import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar'


export default function App() {
   const [loading, setLoading] = useState(true)
   const [user,setUser]=useState(null)
  
useEffect(()=>{
  const fetchUser=async()=>{
    try{
      const res=await axios.get(  `${import.meta.env.VITE_API_URL}/api/auth/profile`,{
        withCredentials:true
    })
  
      setUser(res.data.user)
      console.log(res.data)
    
  }catch(error){
    console.log(error.message)
  }
  }
  fetchUser()
},[])
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <PageLoader/>
  return (
    <div>
      
      {/* <Navbar user={user}/> */}
<Routes>
  <Route path="/" element={<Home user={user}/>}/>
  <Route path='/dashboard' element={<ProtectedRoute>
    <Dashboard/>
  </ProtectedRoute>}/>  
  <Route path='/login' element={
    <Login/>
    }/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/notes' element={<ProtectedRoute>
    <Notes user={user}/>
    </ProtectedRoute>
    }/>
  <Route path='/subjects' element={<ProtectedRoute>
    <Subjects user={user}/>
    </ProtectedRoute>
    }/>
  <Route path="/tasks" element={<ProtectedRoute>
    <Task user={user}/>
    </ProtectedRoute>
    }/>
  <Route path="/study-timer" element={<ProtectedRoute>
    <StudyTimer user={user}/>
    </ProtectedRoute>
    }></Route>
  <Route path="/ai-study" element={<ProtectedRoute>
    <AIStudy user={user}/>
    </ProtectedRoute>
    }></Route>
    <Route path="*" element={<Navigate to="/" />} />
</Routes>

    </div>
  )
}
