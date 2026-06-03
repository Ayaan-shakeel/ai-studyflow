import express from 'express'
import { generateNotes,generateQuiz,sendMessage } from '../controllers/AiStudyController.js'
 export const AIStudyRouter=express.Router()
AIStudyRouter.post('/generate-ai-notes',generateNotes)
AIStudyRouter.post('/generate-ai-quiz',generateQuiz)
AIStudyRouter.post('/send-ai-message',sendMessage)