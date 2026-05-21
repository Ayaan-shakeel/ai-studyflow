import express from 'express';
import { addNotes, deleteNotes, getNotes } from '../controllers/NotesController.js';
import { protectedAuth } from '../middleware/authMiddleware.js';
export const notesRouter=express.Router();
notesRouter.post("/create-notes",protectedAuth,addNotes);
notesRouter.get("/get-notes",protectedAuth,getNotes);
notesRouter.delete("/delete-notes/:id",protectedAuth,deleteNotes)