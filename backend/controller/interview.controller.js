import axios from 'axios';
import InterviewData from '../models/interview.model.js';

export const generateQuestions = async (req, res) => {
  const { role, topic, name, previousQuestions = [], askedQuestion, givenAnswer, numOfQns } = req.body;
  const { email } = req.user;

  if (!role || !topic || !name) {
    return res.status(500).json({ message: "Must provide a role, topic, and name!" });
  }

  if (previousQuestions.length > 0 && (!askedQuestion || !givenAnswer)) {
    console.error('Missing fields for follow-up:', { askedQuestion, givenAnswer });
    return res.status(400).json({
      message: "For follow-up questions, must provide askedQuestion and givenAnswer!",
      received: { askedQuestion, givenAnswer }
    });
  }

  try {
    let prompt;
    let aiResponse;
    let response;

    if (previousQuestions.length === 0) {
      const prompt = `You are conducting a professional interview for a ${role} position focusing on ${topic}.

        Generate:

        1. A brief, professional welcome message for ${name} in a natural tone.
          - It must be exactly 2 sentences and under 100 words total.
          - Do NOT mention simulations, mock interviews, AI, or automation.
          - Refer to the job title naturally and directly (e.g., "frontend developer" instead of "this position" or "the role").

        2. A creative, general transition message that:
          - Acts as a smooth lead-in to the first question (e.g., "To start off,", "Let’s get started with,", "Kicking things off,").
          - Must be a standalone phrase or sentence starter (not a full sentence or question).
          - Must NOT include any part of a question, topic, hint, or reference to the candidate’s background, experience, or skills.
          - Must NOT contain a question mark.
          - Must be professional, slightly varied, and conversational (avoid overused phrases like "Moving on").

        Return STRICT JSON only in this format:
        {
          "addressing": "welcome message",
          "transition": "transition message"
        }`;



      aiResponse = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3.2",
          prompt: prompt,
          stream: false,
          format: "json",
          options: {
            temperature: 0.7
          }
        }
      );

      const rawdata = aiResponse.data.response;

      const jsonMatch = rawdata.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ message: "Invalid JSON received from AI!" });
      }
      response = JSON.parse(jsonMatch[0]);

      const { addressing, transition } = response;

      if (!addressing || !transition) {
        return res.status(500).json({ message: "Failed to generate question!" });
      }

      const data = await InterviewData.findOne({ email });
      const question = data.questions[0];

      let transitionData = transition.trim();
      if (transitionData.endsWith(".")) {
        transitionData = transitionData.slice(0, -1) + ",";
      } else if (!transitionData.endsWith(",")) {
        transitionData += ",";
      }

      let responseData = addressing + " " + transitionData + " " + question;

      return res.status(200).json({ message: "Question generated!", question, responseData });

    } else {

      if (previousQuestions.length == numOfQns) {

        prompt = `You are conducting a professional interview for ${role} focusing on ${topic}.

        Previous Question: "${askedQuestion}"
        Candidate Answer: "${givenAnswer}"

        Generate:

        1. FEEDBACK (STRICT RULES):
          - Exactly 2 professional sentences
          - Use "you/your" to address the candidate directly
          - Only assess the answer — no suggestions, tips, or ratings
          - Example: "Your explanation covered X well. You might clarify Y."

        2. END MESSAGE (STRICT RULES):
          - Generate a professional, warm, and slightly longer thank-you message (2–3 sentences)
          - Express appreciation for the candidate’s time, effort, and responses
          - Example tone: "Thank you for participating in this interview. Your insights were valuable and demonstrated thoughtful engagement. We appreciate the time and effort you invested."

        Return STRICT JSON:
        {
          "feedback": "your 2-sentence feedback",
          "transition": "a 2–3 sentence thank-you message to end the interview"
        }
        ONLY return this JSON with no other text.`;

      } else {

        prompt = `You are conducting a professional interview for ${role} focusing on ${topic}.

        Previous Question: "${askedQuestion}"
        Candidate Answer: "${givenAnswer}"

        Generate:

        1. FEEDBACK (STRICT RULES):
          - Exactly 2 professional sentences
          - Use "you/your" to address the candidate directly
          - Only assess the answer — no suggestions, tips, or ratings
          - Example: "Your explanation covered X well. You might clarify Y."

        2. TRANSITION (STRICT RULES):
          - Use one of these openings:
            "Next, let's discuss,", "Moving on to,", "Now, consider,"
          - Do NOT include a question — just a natural lead-in to a new topic
          - End with a colon or ellipsis, not a full sentence or question

        Return STRICT JSON:
        {
          "feedback": "your 2-sentence feedback",
          "transition": "transition phrase only (no question)"
        }
        ONLY return this JSON with no other text.`;
      }



      aiResponse = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3.2",
          prompt: prompt,
          stream: false,
          format: "json",
          options: {
            temperature: 0.7
          }
        }
      );

      let rawdata = aiResponse.data.response;

      if (!rawdata.endsWith("}")) {
        rawdata += "}";
      }

      const jsonMatch = rawdata.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ message: "Invalid JSON received from AI!" });
      }
      response = JSON.parse(jsonMatch[0]);
      const { feedback, transition } = response;

      const data = await InterviewData.findOne({ email });
      const question = data.questions[previousQuestions.length];

      let transitionData = transition.trim();


      if (!question) {
        if (transitionData.endsWith(",")) {
          transitionData = transitionData.slice(0, -1) + ".";
        } else if (!transitionData.endsWith(".")) {
          transitionData += ".";
        }
      } else {
        if (transitionData.endsWith(".")) {
          transitionData = transitionData.slice(0, -1) + ",";
        } else if (!transitionData.endsWith(",")) {
          transitionData += ",";
        }
      }

      let responseData = "";

      if (!question) {
        responseData = feedback + " " + transitionData;
      } else {
        responseData = feedback + " " + transitionData + " " + question;
      }

      return res.status(200).json({ message: "Question generated!", question, responseData });
    }

  } catch (err) {
    console.error("Error in generateQuestions:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const checkRoleAndTopic = async (req, res) => {

  const { role, topic, numOfQns } = req.body;
  const email = req.user.email;

  if (!role || !topic || !numOfQns) {
    return res.status(500).json({ message: "Provide valid inputs" });
  }

  if (numOfQns < 2 || numOfQns > 25) {
    return res.status(400).json({ message: "Please provide a number of questions between 1 and 25." });
  }

  try {
    const prompt = `
    You are an expert AI interview assistant.

    Your task:
    - Validate whether the given role and topic are appropriate and related.
    - If valid, generate an array of unique interview questions relevant to the role and topic.

    Constraints:
    1. Generate exactly ${numOfQns} unique and non-repetitive interview questions.
    2. Each question must be answerable within 6 lines and should not exceed 600 words in response.
    3. All questions must be different from each other in wording and focus.
    4. Return your response strictly in the following JSON format:

    If valid:
    {
      "valid": true,
      "questions": [
        "First unique question?",
        "Second unique question?",
        ...
      ]
    }

    If invalid (role and topic do not match or are inappropriate):
    {
      "valid": false,
      "questions": []
    }

    Now process this input:
    Role: ${role}
    Topic: ${topic}

    Only respond with the JSON object as described above. Do not include any explanations.`;

    const aiResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2",
        prompt: prompt,
        stream: false,
        format: "json",
        options: {
          temperature: 0.7
        }
      }
    );

    let rawdata = aiResponse.data.response;

    if (!rawdata.endsWith("}")) {
      rawdata += "}";
    }

    const jsonMatch = rawdata.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ message: "Invalid JSON received from AI!" });
    }
    const response = JSON.parse(jsonMatch[0]);

    let { valid, questions } = response;


    if (valid) {
      try {

        questions = questions.slice(0, numOfQns);

        await InterviewData.findOneAndDelete({ email });

        const newData = new InterviewData({
          email,
          questions
        });

        await newData.save();

      } catch (err) {
        console.log(err);
      }
    }


    return res.status(200).json({ message: "Questions generated", response });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}
























