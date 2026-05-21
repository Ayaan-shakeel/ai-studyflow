import Note from "../models/NotesModel.js";

export const addNotes=async(req,res)=>{
  try{
    const{title,content}=req.body;
    if(!title || !content || !req.user){
        return res.status(400).json({status:0,message:"All fields are required"})
    };
    const newNote=await Note.create({
        title,
        userId:req.user._id,
        content
    })
   res.status(201).json({status:1,message:"Notes Created Successfully",note:newNote})
  }
  catch(error){
    console.log(error);
    res.status(500).json({status:0,message:error.message})
  }
}

export const getNotes=async(req,res)=>{
    try{
const notes=await Note.find({userId:req.user._id}).sort({createdAt:-1});
res.status(200).json({status:1,message:"Notes fetched Successfully",notes:notes})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:0,message:error.message})
    }
}
export const deleteNotes=async(req,res)=>{
    try{
const deletenote=await Note.findById(req.params.id);
if(!deletenote){
    return res.status(404).json({status:0,message:"Note not found"})
}
if(deletenote.userId.toString()!==req.user._id.toString()){
    return res.status(401).json({status:0,message:"You are not authorized to delete this note"})
}
await deletenote.deleteOne();
res.status(200).json({status:1,message:"Note deleted successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:0,message:error.message})
    }
}