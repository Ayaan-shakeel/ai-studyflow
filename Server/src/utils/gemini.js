import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv'
dotenv.config()
const genAI=new GoogleGenerativeAI(
    process.env.Gemini_API_Key
)
export const model=genAI.getGenerativeModel({
    model:"gemini-2.5-flash"
})