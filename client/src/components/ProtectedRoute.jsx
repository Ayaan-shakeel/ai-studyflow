import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    if(!token){
        navigate("/login");
    }
  return 
  children;
}
