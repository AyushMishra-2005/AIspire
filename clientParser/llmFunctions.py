import requests
import json

def parse_resume_with_llm(text):
  prompt = f"""
You are an intelligent and structured JSON resume parser.

Given the raw text of a candidate's resume, extract **only the technical information** relevant for generating technical interview questions. Ignore personal details like name, email, phone, etc.

### Instructions:
- Return a well-structured JSON object.
- Do NOT include any comments, explanations, or introductory text.
- Only extract content that is useful to generate technical interview questions.
- If a section is missing, return an empty list for it.
- Start and end with curly braces {{}} for a valid JSON object.

### Extract ONLY the following fields:

1. **skills**:
   - Grouped under categories:
     - frontend
     - backend
     - mobile
     - devops
     - databases
     - tools_and_platforms

2. **experience**: list of objects with:
   - company
   - role
   - technologies (tech/tools used in the role)
   - responsibilities (as bullet points or short sentences)

3. **projects**: list of objects with:
   - name
   - role
   - description (brief summary of what the project does)
   - technologies (languages, libraries, frameworks, tools used)

Here is the resume content:
\"\"\"
{text}
\"\"\"

Respond ONLY with the final JSON object.
"""



  response = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3:8b",
    "prompt": prompt,
    "stream": False,
    "temperature": 0.8,         
    "format": "json"           
  })


  return response.json()["response"]

def evaluate_resume(resume_json, job_title, topics):
    topics_str = ", ".join(topics)

    prompt = f"""
      You are a strict technical hiring evaluator.

      You are given:
      - A job title
      - A list of required technologies or topics
      - A parsed resume in JSON format

      Your task is to score how well the candidate's resume aligns with the job **only based on those technologies/topics** and the job title.

      ### SCORING RULES:
      - Score out of 10 (no decimals)
      - Use only relevant experience to calculate score (projects, roles, tools)
      - Do not give points for unrelated achievements or soft skills
      - Look for direct mention in projects or experience — skills alone are not enough
      - Use this guide:

        - 10 = Strong experience/projects **in all listed topics**
        - 7–9 = Mostly covered with strong depth in some topics
        - 4–6 = Some coverage, maybe missing hands-on work or key tools
        - 1–3 = Mentioned skills but no real usage
        - 0 = No connection to required skills/topics

      ### OUTPUT FORMAT:
      Return only valid JSON in this format:
      {{
        "total_score": <integer score out of 10>,
        "summary_feedback": "<3–4 sentence summary justifying the score based on actual resume content>"
      }}

      ### INPUTS:
      Job Title: "{job_title}"  
      Required Topics: [{topics_str}]

      Candidate Resume:
      {resume_json}
      """


    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3:8b",
        "prompt": prompt,
        "stream": False,
        "temperature": 0.7,
        "format": "json"
    })

    raw_output = response.json()["response"]

    try:
      parsed_output = json.loads(raw_output)
      return parsed_output
    except json.JSONDecodeError as e:
      print("Failed to parse LLM response:", e)
      return {"error": "Invalid JSON from LLM", "raw": raw_output}
