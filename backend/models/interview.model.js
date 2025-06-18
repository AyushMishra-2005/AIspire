import mongoose from "mongoose";
import { Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    questions: {
      type: [String],
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const InterviewData = mongoose.model("InterviewData", interviewSchema);

export default InterviewData;






















