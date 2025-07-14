import axios from 'axios'
import { validateRoleAndTopic } from '../utils/validateRoleAndTopic.js'
import fs from 'fs'
import FormData from 'form-data';
import { deleteFile } from '../utils/deleteFile.js';
import { generateInterviewQuestions } from '../utils/generateProfileInterviewQuestions.js';


export const checkRoleValidity = async (req, res) => {

  let { role, topics, numberOfQns } = req.body;

  if (typeof topics === "string") {
    topics = [topics];
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const filePath = req.file.path;

  if (
    !role?.trim() ||
    !Array.isArray(topics) ||
    topics.length === 0 ||
    !topics.some(topic => topic.trim() !== "") ||
    !numberOfQns
  ) {
    deleteFile(filePath);
    return res.status(400).json({ message: "Please provide a valid role and at least one non-empty topic." });
  }

  const form = new FormData();
  form.append("file", fs.createReadStream(filePath), req.file.originalname);

  try {

    const { valid } = await validateRoleAndTopic({ role, topics });

    console.log(valid);

    if (!valid) {
      deleteFile(filePath);
      return res.status(501).json({ message: "Not valid role and topic" });
    }

    const flaskUrl = "http://127.0.0.1:3000/parse-resume";

    const { data } = await axios.post(flaskUrl, form, {
      headers: form.getHeaders(),
    });

    console.log("Resume parsed");

    if (data.resume_data) {
      const questions = await generateInterviewQuestions(
        data.resume_data,
        role,
        Array.isArray(topics) ? topics : topics.split(","),
        parseInt(numberOfQns) || 5
      );

      console.log(questions)

      return res.status(200).json({
        resume_data: data.resume_data,
        questions,
        message : "Resume Parsing successful"
      });

    } else {
      deleteFile(filePath);
      return res.status(500).json({ message: "Resume parsing failed." });
    }

    

  } catch (err) {
    console.log(err);
    deleteFile(filePath);
    return res.status(501).json({ message: "server error" });
  }
}





























