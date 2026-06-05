import {model} from '../utils/gemini.js'

export const sendMessage=async(req,res)=>{
    try{
        console.log("--- Debug Incoming Request Body ----",req.body)
        const {prompt}=req.body;
        if(!prompt){
            return res.status(400).json({status:0,message:"Backend recieved an empty or undefined message."})
        }
        const result=await model.generateContent({
            contents:[{
                role:'user',
                parts:[{text:prompt}]
            }],
        });
        const response=result.response.text();

res.status(200).json({status:1,message:"I am Your AI Assistant.How can I Help you?",response:response})
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({status:1,"message":error.message})
    }
}

export const generateQuiz=async(req,res)=>{
    try{
        res.status(200).json({status:1,message:"This is AI Generated Quiz"})
    }
    catch(error){
        res.status(500).json({status:500,message:error.message})
    }
}
export const generateNotes=async(req,res)=>{
    try{
        res.status(200).json({status:1,message:"Its an AI Generated Note"})
    }
    catch(error){
        res.status(500).json({status:500,message:error.message})
    }
}