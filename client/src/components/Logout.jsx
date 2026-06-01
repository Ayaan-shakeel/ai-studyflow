import React from 'react'

export default function Logout() {
    const handleLogout=()=>{
        localStorage.removeItem("token");
        window.location.href="/login";
    }
  return (
    <div>
      <button className="bg-white" onClick={handleLogout}>Logout</button>
    </div>
  )
}
