import { motion } from "framer-motion";
import { Children } from "react";
export const TaskCard=({children})=>{
return(
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-slate-900 to-gray-800">
        <motion.div
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.5}}
            className="bg-linear-to-r from-emerald-50 to-pink-200  p-8 rounded-3xl shadow-2xl w-92.5"
            >
            {children}
        </motion.div>

        
    </div>
)
}