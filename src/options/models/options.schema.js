import mongoose from "mongoose";

const optionsSchema = new mongoose.Schema({
  serialNum: {
    type: Number,
    required: [true, "Serial number for the option is required"],
  },
  text: {
    type: String,
    required: [true, "Option text is required"],
    minLength: [1, "Option should be atleast 1 character long"],
    maxLength: [100, "Question cannot exceed 100 characters"],
  },
  votes: {
    type: Number,
    default: 0,
  },
  votingLink: {
    type: String,
    required: [true, "Voting link is required"],
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

const OptionsModel = mongoose.model("Options", optionsSchema);
export default OptionsModel;
