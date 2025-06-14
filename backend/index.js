import express from 'express'
import cors from 'cors'
import axios from 'axios'
import interviewSection from './route/interview.route.js'

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

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


app.listen(8000, () => {
  console.log("app is running at port 8000");
});























