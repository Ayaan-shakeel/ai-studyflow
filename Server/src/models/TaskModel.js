import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    isPriority: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema);
export default Task;