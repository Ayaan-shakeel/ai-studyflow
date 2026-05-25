import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const protectedAuth = async (req, res, next) => {
    try {

        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ status: 0, message: "Unauthorized Access" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ status: 0, message: "Unauthorized Access" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }

}