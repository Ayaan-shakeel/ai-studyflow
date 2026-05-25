import Subject from "../models/SubjectModel.js";


export const addSubject = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ status: 0, message: "Name is required" });

        }
        const subject = await Subject.create({
            name,
            userId: req.user._id
        })
        return res.status(200).json({ status: 1, message: "Subject added successfully", subject: subject });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: error.message });
    }
}
export const getSubjects = async (req, res) => {
    try {

        const subjects = await Subject.find({ userId: req.user._id }).sort({ name: 1 });
        return res.status(200).json({ status: 1, message: "Subjects fetched successfully", subjects: subjects });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: error.message });
    }
}
export const deleteSubject = async (req, res) => {
    try {
        const deleteSubject = await Subject.findById(req.params.id);
        if (!deleteSubject) {
            return res.status(404).json({ status: 0, message: "Subject not found" });
        }
        if (deleteSubject.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ status: 0, message: "You are not authorized to delete this subject" });
        }
        await deleteSubject.deleteOne();
        res.status(200).json({ status: 1, message: "Subject deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: error.message });
    }

}
export const updateSubject = async (req, res) => {
    try {
        const { name } = req.body;
        const updateSubject = await Subject.findById(req.params.id);
        if (!updateSubject) {
            return res.status(404).json({ status: 0, message: "Subject not found" })
        };
        if (!updateSubject.userId.toString() !== req.user.id.toString()) {
            return res.status(401).json({ status: 0, message: "You are not authorized to update this subject" })
        }
        updateSubject.name = name || updateSubject.name
        await updateSubject.save();
        res.status(200).json({ status: 1, message: "Subject updated Successfully", subject: updateSubject })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: error.message });
    }
}