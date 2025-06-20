import express from 'express'
import cors from 'cors'
import axios from 'axios'
import interviewSection from './route/interview.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary';
import userRoute from './route/user.route.js'
import secureRoute from './middleware/secureRoute.js'
import quizRoute from './route/quiz.route.js'

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
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const main = async () => {
  await mongoose.connect(MONGO_URI).then((data) => {
    console.log("Database is Connected");
  }).catch((err) => {
    console.log("Database Error : ", err);
  });
}

main();

app.use('/user', userRoute);
app.use('/interview', interviewSection);
app.use('/quiz', quizRoute);

app.get('/verify-token', secureRoute, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user, 
  });
});

app.get("/getImage", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  });
});


app.listen(port, () => {
  console.log("app is running at port 8000");
});























