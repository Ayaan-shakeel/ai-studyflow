import express from 'express';
import {addTask, getTasks, deleteTask, updateTask} from '../controllers/TaskController.js';
import {protectedAuth} from '../middleware/authMiddleware.js';

export const taskRouter=express.Router();
taskRouter.post('/create-task',protectedAuth,addTask)
taskRouter.get('/get-tasks',protectedAuth,getTasks)
taskRouter.delete('/delete-task/:id',protectedAuth,deleteTask)  
taskRouter.put('/update-task/:id',protectedAuth,updateTask)