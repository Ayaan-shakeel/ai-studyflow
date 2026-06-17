import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs"
import connectDB from "./src/config/db.js";
import { router } from "./src/routes/authRoutes.js";
import { notesRouter } from "./src/routes/NotesRoutes.js";
import { subjectRouter } from "./src/routes/SubjectRoutes.js";
import { taskRouter } from "./src/routes/TaskRoutes.js";
import { AIStudyRouter } from "./src/routes/AiStudyRoutes.js";

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:[ "http://localhost:5173",
            "https://ai-studyflow-three.vercel.app"
        ],
        credentials: true

    }
));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send({ status: 1, message: "Api Running" })

});
app.use("/api/auth", router)
app.use("/api/notes", notesRouter)
app.use("/api/subjects", subjectRouter)
app.use("/api/tasks", taskRouter)
app.use("/api/ai-study",AIStudyRouter)
connectDB();
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})