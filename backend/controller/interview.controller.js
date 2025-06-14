import axios from 'axios';

export const generateQuestions = async (req, res) => {
  const { role, topic, name, previousQuestions = [], askedQuestion, givenAnswer } = req.body;

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
      console.log("I am working");
      const prompt = `You are an AI interviewer conducting a mock interview for the role of ${role}, focusing on the topic: ${topic}.
      Start by welcoming the candidate named ${name} in a natural, professional tone using only two sentences and under 100 words.
      Do not mention that this is a simulation, mock interview, or that you're an AI. Refer to the job role like a real position (e.g., "frontend developer" not "role of frontend developer").

      Then, write the first interview question related to "${topic}" that can be answered in a maximum of 8 lines.
      Before the question, add a short transition phrase like "Moving on to the first question," "Let's begin with the first question," or "To start off,".
      Keep the question clear, concise, and focused.

      Return your output in this exact JSON format:
      {
        "transition": "your welcome message here",
        "question": "your transition phrase and first interview question here"
      }
      Important: Return only the JSON object and nothing else. 
      Do not include any explanations, extra text, or commentary before or after the JSON. 
      Your entire response must be valid JSON that can be parsed directly with JSON.parse().  
      `;

      aiResponse = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3.2",
          prompt: prompt,
          stream: false,
        }
      );

      const rawdata = aiResponse.data.response;
      const jsonMatch = rawdata.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ message: "Invalid JSON received from AI!" });
      }
      response = JSON.parse(jsonMatch[0]);

      const { question, transition } = response;

      if (!question || !transition) {
        return res.status(500).json({ message: "Failed to generate question!" });
      }

      let responseData = transition + " " + question;
      console.log(question);
      return res.status(200).json({ message: "Question generated!", question, responseData });

    } else {
      prompt = `You are an AI interviewer conducting a mock interview for the role of ${role}, focusing on the topic: ${topic}.
      You asked the question: "${askedQuestion}", and the candidate responded: "${givenAnswer}".

      First, provide feedback on the candidate's answer. Speak directly to the candidate using "you" or "your". Give exactly two natural, professional feedback sentences. Do not ask follow-up questions, give suggestions, include ratings, or extra commentary. Stop after two sentences. Keep the feedback under 100 words.

      Then, choose one transition phrase from the following list to begin your next question:
      ["Now, let's move on to the next question.", "Let's continue with the next question.", "Moving forward, here's another question.", "Next, consider this:", "Here comes the next one."]

      After the transition phrase, ask one new question related to "${topic}" that is COMPLETELY DIFFERENT from these already asked questions:
      ${previousQuestions.map((q, i) => `${i + 1}. "${q}"`).join('\n')}

      IMPORTANT:
      - The new question must be substantially different in content and scope
      - Do not rephrase or slightly modify previous questions
      - Cover a different aspect of ${topic}
      - The question should be clear, concise, and answerable in 8 lines or less
      - Do not ask questions during giving review. Only give review about the user answer.

      Return your output in this exact JSON format:
      {
        "feedback": "your two-sentence feedback here",
        "question": "your transition phrase and next question here"
      }
      Important: Return only the JSON object and nothing else.`;

      aiResponse = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3.2",
          prompt: prompt,
          stream: false,
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


      const { feedback, question } = response;

      let responseData = feedback + " " + question;

      console.log(question);

      return res.status(200).json({ message: "Question generated!", question, responseData });
    }

  } catch (err) {
    console.error("Error in generateQuestions:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};





























