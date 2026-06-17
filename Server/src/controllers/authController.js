import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ status: 0, message: "Please fill all the fields" })
        }
        const extinguishUser = await User.findOne({ email });
        if (extinguishUser) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        
        res.status(201).json({
            status: 201, message: "User registered Successfully", user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 0, message: "Both fields are required" })
        }
        const registeredUser = await User.findOne({ email });
        if (!registeredUser) {
            return res.status(400).json({ status: 0, message: "Invalid credentials" })
        }
        const isPasswordMatch = await bcrypt.compare(password, registeredUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: 0, message: "Invalid credentials" })
        }
        const token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            status: 1, message: "Login successful", user: {
                id: registeredUser._id,
                username: registeredUser.username,
                email: registeredUser.email
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message });
    }
}
export const getProfile = async (req, res) => {
    try {
        res.status(201).json({ success: true, message: "Profile fetched Successfully", user: req.user })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }

}

export const handleLogout=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:true,
            sameSite:"none",
        })
        res.status(200).json({status:1,message:"Logged out Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:0,message:error.message})
    }
}