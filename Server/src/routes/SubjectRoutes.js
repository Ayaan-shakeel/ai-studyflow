import express from "express";
import { protectedAuth } from "../middleware/authMiddleware.js";
import { addSubject, deleteSubject, getSubjects, updateSubject } from "../controllers/SubjectController.js";

export const subjectRouter=express.Router();
subjectRouter.post("/create-subject",protectedAuth,addSubject);
subjectRouter.get("/get-subjects",protectedAuth,getSubjects);
subjectRouter.delete("/delete-subject/:id",protectedAuth,deleteSubject);
subjectRouter.put("/update-subject/:id",protectedAuth,updateSubject)