import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react'

export default function ProtectedRoute({children}) {
const [authenticated, setAuthenticated] = useState(false)
useEffect(()=>{
axios.get("http://localhost:5000/api/auth/profile",{
  withCredentials:true
}).then(()=>{
  setAuthenticated(true)
}).catch(()=>{
  setAuthenticated(false)
})
},[])
return authenticated ? children : <Navigate to="/login"/>
}

