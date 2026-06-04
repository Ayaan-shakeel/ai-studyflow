import {model} from '../utils/gemini.js'

export const generateNotes=async(req,res)=>{
    try{
        const {message}=req.body;
        const result=await model.generateContent({
            contents:[{
                role:'user',
                parts:[{text:message}]
            }],
        });
        const response=result.response.text();

res.status(200).json({status:1,message:"This is AI Generated Note",response:response})
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
export const sendMessage=async(req,res)=>{
    try{
        res.status(200).json({status:1,message:"I am Your AI Assistant.How can I Help you?"})
    }
    catch(error){
        res.status(500).json({status:500,message:error.message})
    }
}