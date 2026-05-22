import { motion } from "framer-motion";
import { Children } from "react";
export default function NotesCard({children}){
return(
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-300 via-purple-400 to-gray-800">
        <motion.div
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.5}}
            className="bg-gray-500 p-8 rounded-3xl transition-all duration-300 shadow-2xl w-92.5"
            >
            {children}
        </motion.div>

        
    </div>
)
}