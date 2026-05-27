import { motion } from "framer-motion";
import { Children } from "react";
export const TimerCard=({children})=>{
return(
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-800 via-teal-950 to-purple-200">
        <motion.div
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.5}}
            className="bg-linear-to-br from-gray-900 via-blue-950 to-stone-950 text-white transition-all duration-300 h-[50%] lg:h-[30%] md:h-[40%] p-8 rounded-3xl shadow-2xl w-full max-w-md"
            >
            {children}
        </motion.div>

        
    </div>
)
}