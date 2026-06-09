import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
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


export default function App({user}) {
   const [loading, setLoading] = useState(true)
  

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
  <Route path="/" element={<Home/>}/>
  <Route path='/dashboard' element={<ProtectedRoute>
    <Dashboard/>
  </ProtectedRoute>}/>  
  <Route path='/login' element={
    <Login/>
    }/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/notes' element={<ProtectedRoute>
    <Notes/>
    </ProtectedRoute>
    }/>
  <Route path='/subjects' element={<ProtectedRoute>
    <Subjects/>
    </ProtectedRoute>
    }/>
  <Route path="/tasks" element={<ProtectedRoute>
    <Task/>
    </ProtectedRoute>
    }/>
  <Route path="/study-timer" element={<ProtectedRoute>
    <StudyTimer/>
    </ProtectedRoute>
    }></Route>
  <Route path="/ai-study" element={<ProtectedRoute>
    <AIStudy/>
    </ProtectedRoute>
    }></Route>
</Routes>

    </div>
  )
}
