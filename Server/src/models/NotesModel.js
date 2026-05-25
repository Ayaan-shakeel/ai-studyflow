import mongoose from 'mongoose';
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },

},
    {
        timestamps: true
    })
const Note = mongoose.model('Note', NotesSchema);
export default Note;