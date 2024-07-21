import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    serialNum: {
        type: Number,
        required: [true, "Serial number for the question is required"]
    },
    question: {
        type: String,
        required: [true, "Question text is required"],
        minLength: [
            5, "Question should be atleast 5 characters long"
        ],
        maxLength: [
            250, "Question cannot exceed 250 characters"
        ]
    }
});

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;