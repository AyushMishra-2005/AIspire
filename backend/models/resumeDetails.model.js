import mongoose from "mongoose";
import { Schema } from "mongoose";

const resumeContentSchema = new Schema({
  title: String,
  thumbnailLink: String,
  profileInfo: {
    profileImg: String,
    profilePreviewUrl: String,
    fullName: String,
    designation: String,
    summary: String,
  },
  template: {
    number: {
      type: Number,
      default: 0
    },
  },
  contactInfo: {
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
  },
  workExperience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  education: [{
    degree: String,
    institution: String,
    startDate: String,
    endDate: String,
  }],
  skills: [{
    name: String,
    progress: {
      type : Number,
      default : 0
    },
  }],
  projects: [{
    title: String,
    description: String,
    github: String,
    liveDemo: String,
  }],
  certifications: [{
    title: String,
    issuer: String,
    year: String,
  }],
  languages: [{
    name: String,
    progress: {
      type : Number,
      default : 0
    },
  }],
  interest: [{
    name: String,
  }]
}, { _id: false }); 

const resumeDetailsSchema = new Schema({
  resumeDetails: resumeContentSchema,
}, { timestamps: true });

const ResumeDetails = mongoose.model("ResumeDetails", resumeDetailsSchema);

export default ResumeDetails
