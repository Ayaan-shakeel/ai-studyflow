import mongoose from 'mongoose';
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

},
    {
        timestamps: true
    },
)
const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;