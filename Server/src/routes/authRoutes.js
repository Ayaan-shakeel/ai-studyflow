import express from "express";
import {  getProfile, loginUser, registerUser, handleLogout } from "../controllers/authController.js";
import { protectedAuth } from "../middleware/authMiddleware.js";
export const router=express.Router();
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/profile",protectedAuth,getProfile)
router.post("/logout",handleLogout)