import Task from '../models/TaskModel.js';

export const addTask = async (req, res) => {
    try {
        const { title,  dueDate, isPriority, isDone } = req.body;
        if (!title) {
            return res.status(400).json({ status: 0, message: "Title is  required field" })
        };
        const task = await Task.create({
            title,
            dueDate,
            isDone,
            isPriority,
            userId: req.user._id
        })
        await task.populate("userId", "username")
        res.status(200).json({ status: 1, message: "Task added Successfully", task: task })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).populate("userId", "username").sort({ createdAt: -1 });
        res.status(200).json({ status: 1, message: "Tasks fetched successfully", tasks: tasks })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findById(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ status: 0, message: "Task not found" })
        };
        if (deleteTask.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ status: 0, message: "You are not authorized to delete this task" })
        }
        await deleteTask.deleteOne();
        res.status(200).json({ status: 1, message: "Task deleted Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }
};
export const updateTask = async (req, res) => {
    try {
        const { title, dueDate, isPriority, isDone } = req.body;
        const updateTask = await Task.findById(req.params.id);
        if (!updateTask) {
            return res.status(404).json({ status: 0, message: "Task not found" })
        }
        if (updateTask.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ status: 0, message: "You are unauthorized to update this task" })
        };
        updateTask.title = title || updateTask.title;
        updateTask.dueDate = dueDate || updateTask.dueDate;
        updateTask.isDone = isDone ?? updateTask.isDone;
        updateTask.isPriority = isPriority ?? updateTask.isPriority;
        await updateTask.save();
        return res.status(200).json({ status: 1, message: "Task updated Successfully", task: updateTask })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message })
    }
}