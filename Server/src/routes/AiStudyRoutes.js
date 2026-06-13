import express from 'express'
import { generateNotes,generateQuiz,sendMessage,saveAiNote } from '../controllers/AiStudyController.js'
import { protectedAuth } from '../middleware/authMiddleware.js'
 export const AIStudyRouter=express.Router()
AIStudyRouter.post('/generate-ai-notes',protectedAuth,generateNotes)
AIStudyRouter.post('/generate-ai-quiz',protectedAuth,generateQuiz)
AIStudyRouter.post('/send-ai-message',protectedAuth,sendMessage)
AIStudyRouter.post("/save-ai-note",protectedAuth,saveAiNote)