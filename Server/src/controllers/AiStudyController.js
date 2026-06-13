import {model} from '../utils/gemini.js'
import Note from '../models/NotesModel.js';

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
        const {prompt}=req.body;
        if(!prompt){
            return res.status(400).json({status:0,message:"Prompt field is required"})
        }
        const aiPrompt=`Generate 10 MCQ questions on ${prompt} Format :[{"question":"Questions Here","options":["A","B","C","D"],"answer":"Correct Answer"}] Do not inclue mark`
        const result=await model.generateContent({
            contents:[{
                role:'user',
                parts:[{text:aiPrompt}]
            }],
        });
      const text = result.response.text();

const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const quizData = JSON.parse(cleanText);
        res.status(200).json({status:1,message:"This is AI Generated Quiz","quizData":quizData})
    }
    catch(error){
        res.status(500).json({status:500,message:error.message})
    }
}
export const generateNotes=async(req,res)=>{
    try{
        const {prompt}=req.body;
        if(!prompt){
            return res.status(400).json({status:0,message:"Backend recieved an empty or undefined message."})
        }
        const aiPrompt=`Create detailed study notes on ${prompt} Format : #Introduction #important Concepts #Key Points #Summary Make it Student friendly`;
        const result=await model.generateContent({
            contents:[{
                role:'user',
                parts:[{text:aiPrompt}]
            }],
        });
        const response=result.response.text();
        res.status(200).json({status:1,message:"Its an AI Generated Note",response:response})
    }
    catch(error){
        res.status(500).json({status:500,message:error.message})
    }
}
export const saveAiNote=async(req,res)=>{
    try{

    const{title,content,subjectId}=req.body;
    if(!title || !content || !subjectId){
        return res.status(400).json({status:0,message:"Title, Content and Subject fields are required."})

        }
        const aiNote= await Note.create({
            title,
            content,
            subjectId,
            userId:req.user._id,
            isAiGenerated:true
        })
        await aiNote.populate("subjectId","name")
        res.status(201).json({status:1,message:"AI Note Created Successfully",aiNote:aiNote})
       }
       catch(error){
        console.log(error.message)
           res.status(500).json({status:500,message:error.message})
       }
}