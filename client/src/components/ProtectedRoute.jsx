import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import PageLoader from './PageLoader'

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null)

  useEffect(() => {
    axios.get(
       `${import.meta.env.VITE_API_URL}/api/auth/profile`,
      {
        withCredentials: true
      }
    )
    .then(() => {
      setAuthenticated(true)
    })
    .catch(() => {
      setAuthenticated(false)
      toast.error("Login First")
    })
  }, [])

  if (authenticated === null) {
    return <PageLoader />
  }

  return authenticated
    ? children
    : <Navigate to="/login" />
}