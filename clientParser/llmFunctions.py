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
    "model": "llama3.1:8b",
    "prompt": prompt,
    "stream": False,
    "temperature": 0.8,         
    "format": "json"           
  })


  return response.json()["response"]

def evaluate_resume(resume_json, job_title, topics):
    topics_str = ", ".join(topics)

    prompt = f"""
You are a highly strict and technical hiring evaluator.

You are provided with:
- A job title
- A list of required technologies or topics
- A parsed resume in structured JSON format

Your task is to **rigorously assess** how well the candidate's resume aligns with the job requirements, based **only** on the required topics and job title.

---

### SCORING INSTRUCTIONS (STRICT MODE):

You must assign a score **out of 10**, based **strictly** on the candidate's **hands-on experience** and **project usage** of the listed topics. Ignore unrelated content.

  - Award points **only** when:
  - The topic is **explicitly mentioned** in projects, job roles, or experience **AND**
  - The candidate demonstrates **actual usage**, implementation, or problem-solving with that topic

  - Do **not** give points for:
  - Topics listed under "skills" or "technologies" without context
  - Vague or buzzword mentions without concrete examples
  - Academic mentions without hands-on application
  - General-purpose tools (e.g. Python, Java) unless directly applied to a required topic

---

### SCORING SCALE:

- **10**: Strong, hands-on experience in **all** required topics across multiple projects or roles
- **7–9**: Strong implementation of **most** topics with clear evidence
- **4–6**: Some exposure or indirect use; lacking technical depth or coverage
- **1–3**: Topics mentioned but not truly used
- **0**: No relevant usage of any required topic

---

### OUTPUT FORMAT:
Return only a valid JSON object like this:

{{
  "total_score": <integer from 0 to 10>,
  "summary_feedback": "<3–4 sentence explanation justifying the score. Use specific project/experience references from the resume. Be concise and critical — do not praise irrelevant content.>"
}}

---

### INPUTS:

Job Title: "{job_title}"  
Required Topics: [{topics_str}]

Candidate Resume:
{resume_json}
"""



    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3.1:8b",
        "prompt": prompt,
        "stream": False,
        "temperature": 0.5,
        "format": "json"
    })

    raw_output = response.json()["response"]

    try:
      parsed_output = json.loads(raw_output)
      return parsed_output
    except json.JSONDecodeError as e:
      print("Failed to parse LLM response:", e)
      return {"error": "Invalid JSON from LLM", "raw": raw_output}
