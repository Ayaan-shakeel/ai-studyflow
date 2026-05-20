import React from 'react'
import { useState } from 'react'
import { BookOpen, Cross, LayoutDashboard, LogOut, Menu, NotebookTabs, SpaceIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function Sidebar() {
    const [desktopOpen, setDesktopOpen] = useState(false)

  return (
    <div className={`bg-gray-700 ${desktopOpen ? 'w-64' : 'w-20'} text-white transition-all duration-300 h-screen p-5 pt-8 relative mb-5`}>
        <div>

       <button className='mb-5' onClick={()=>{setDesktopOpen(!desktopOpen

)}}><Menu/></button>
     
</div>
       <div className='flex flex-col gap-4'>
<div>
   
        <Link className='flex items-center flex-row gap-3 font-bold' to="/dashboard"><LayoutDashboard />{desktopOpen && <span>Dashboard</span>}</Link>
   
</div>
<div>
   
    <Link  className='flex items-center flex-row gap-3 font-bold' to="/notes"><NotebookTabs />{desktopOpen && <span>Notes</span>  }</Link>
</div>
<div>
   
    <Link  className='flex items-center flex-row gap-3 font-bold' to="/subjects"><BookOpen />{desktopOpen && <span>Subjects</span>  }</Link>
</div>
    <div>
        <button className='flex items-center gap-3 font-bold mt-85 bg-red-400 border-2 border-red-400 rounded-2xl py-2 px-2 w-full'>
            <LogOut />
            {desktopOpen && <span>Logout</span>}
        </button>
        </div>
    </div>
</div>
  )
}
