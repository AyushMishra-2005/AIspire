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
      type: [
        {
          question: {
            type: String,
            required: true
          },
          time: {
            type: Number,
            required: true
          }
        },
      ],
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






















