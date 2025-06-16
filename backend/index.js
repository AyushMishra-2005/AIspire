import express from 'express'
import cors from 'cors'
import axios from 'axios'
import interviewSection from './route/interview.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({limit : "48kb"}));
app.use(cookieParser());

const main = async () => {
  await mongoose.connect(MONGO_URI).then((data) => {
    console.log("Database is Connected");
  }).catch((err) => {
    console.log("Database Error : ", err);
  });
}

main();

app.use('/interview', interviewSection);

app.post("/sendUserMessage", async (req, res) => {
  const { search } = req.body;

  const aiResponse = await axios.post(
    "http://localhost:11434/api/generate",
    {
      "model": "llama3.2",
      "prompt": `${search}`,
      "stream": false
    }
  );

  console.log(aiResponse.data.response);

  res.status(200).json({message : aiResponse.data.response});

});


app.listen(port, () => {
  console.log("app is running at port 8000");
});























