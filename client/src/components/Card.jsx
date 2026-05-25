import React from 'react'
import { motion } from 'framer-motion'
export default function Card({children}) {
  return (
    

<div className="flex items-center justify-center">

    {/* <div className='flex items-center justify-center min-h-screen bg-linear-to-r from-purple-400 via-pink-500 to-red-500'> */}
 <motion.div
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.5}}
            className=" bg-linear-to-br from-cyan-700 via-gray-800 to-lime-700  p-8 rounded-3xl transition-all duration-300 shadow-2xl w-92.5"
            >
            {children}
        </motion.div>

     {/* </div> */}
</div>
  )
}
