import Resume from "../models/resume.model.js";
import ResumeDetails from '../models/resumeDetails.model.js'

export const createResume = async (req, res) => {
  
  const {resumeTitle, resumeDetails} = req.body;

  const email = req.user.email;

  if(!email || !resumeTitle || !resumeDetails){
    return res.status(501).json({message : "Invalid Data"});
  }

  try{

    const newResumeDetails = new ResumeDetails({
      resumeDetails: {
        ...resumeDetails,
        title: resumeTitle
      }
    });

    const savedResumeDetails = await newResumeDetails.save();

    let existingResume = await Resume.findOne({email});

    if(!existingResume){
      const newResume = new Resume({
        email,
        resumes: [savedResumeDetails._id]
      });

      await newResume.save();
      return res.status(200).json({ message: "Resume created successfully.", savedResumeDetails });

    }else{
      existingResume.resumes.push(savedResumeDetails._id);
      await existingResume.save();
      return res.status(200).json({ message: "Resume created successfully.", savedResumeDetails });
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}


export const getResumes = async (req, res) => {
  const email = req.user.email;

  if (!email) return res.status(400).json({ message: "Email required" });

  try{
    const userResumes = await Resume.findOne({ email }).populate('resumes');
    if (!userResumes) return res.status(200).json({ message: "No resumes found" });

    res.status(200).json({message : "Resume Details Fetched", userResumes});
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
} 


export const editResume = async (req, res) => {
  const email = req.user.email;

  if (!email) return res.status(400).json({ message: "Email required" });

  const {id, resumeDetails} = req.body;

  if (!id || !resumeDetails) return res.status(400).json({ message: "ID or ResumeDetails required" });

  try{

    const updatedResume = await ResumeDetails.findByIdAndUpdate(
      id, 
      {resumeDetails, updatedAt: new Date()},
      {new : true}
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume updated successfully", updatedResume });

  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}


























