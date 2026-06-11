import express from 'express'
import { generateNotes,generateQuiz,sendMessage,saveAiNote } from '../controllers/AiStudyController.js'
 export const AIStudyRouter=express.Router()
AIStudyRouter.post('/generate-ai-notes',generateNotes)
AIStudyRouter.post('/generate-ai-quiz',generateQuiz)
AIStudyRouter.post('/send-ai-message',sendMessage)
AIStudyRouter.post("/save-ai-note",saveAiNote)