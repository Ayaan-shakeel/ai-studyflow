import express from "express";
import {  loginUser, registerUser } from "../controllers/authController.js";
export const router=express.Router();
router.post("/register",registerUser)
router.post("/login",loginUser)