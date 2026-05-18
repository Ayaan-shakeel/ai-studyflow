import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs"
import connectDB from "./src/config/db.js";
import { router } from "./src/routes/authRoutes.js";

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send({status:1,message:"Api Running"})
    
});
app.use("/api/auth",router)

connectDB();
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})