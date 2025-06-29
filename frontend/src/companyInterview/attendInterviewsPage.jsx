import React from 'react';
import './interviewPage.css';
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";
import Avatar from '@mui/material/Avatar';

const interviews = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    company: "WhatsApp",
    role: "Frontend Developer",
    topics: ["React", "Tailwind CSS"],
    duration: "30 min"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    company: "Facebook",
    role: "Software Engineer",
    topics: ["React", "Node.js"],
    duration: "45 min"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_minimalista_de_Twitter.png",
    company: "Twitter",
    role: "Backend Developer",
    topics: ["Node.js", "Express"],
    duration: "30 min"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Googleplex-Logo.svg",
    company: "Google",
    role: "Full Stack Engineer",
    topics: ["React", "Node.js", "MongoDB"],
    duration: "60 min"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_minimalista_de_Twitter.png",
    company: "Twitter",
    role: "Backend Developer",
    topics: ["Node.js", "Express"],
    duration: "30 min"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Googleplex-Logo.svg",
    company: "Google",
    role: "Full Stack Engineer",
    topics: ["React", "Node.js", "MongoDB"],
    duration: "60 min"
  },
];

function AttendInterviews() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis hiding?",
    "Write a JavaScript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    // console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className='dark-mystic-bg w-full min-h-screen flex flex-col items-center relative z-10'>
      <div className='flex flex-col w-full max-w-3xl px-6 mt-[4rem]'>
        <h2 className="mb-6 sm:mb-10 text-2xl sm:text-5xl font-bold text-white text-center">
          Ask Aceternity UI Anything
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      <div className="w-full max-w-6xl px-6 mt-16 pb-16">
        <h3 className="text-white text-2xl font-semibold mb-6">Available AI Interviews</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {interviews.map((interview, idx) => (
            <div
              key={idx}
              className="bg-[#131b22] rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(100,200,255,0.15)] hover:-translate-y-1 transition-all duration-300 text-white flex flex-col justify-between border border-transparent hover:border-[#6ca9f3]/30"
            >
              <div>
                <div className="flex justify-center mb-4">
                  <div className="h-[4rem] w-[4rem] rounded-full overflow-hidden border-2 border-[#4c5d6f] shadow-sm flex justify-center items-center">
                    <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${interview.company}&background=random&color=fff&size=128`} sx={{ width: '4rem', height: '4rem' }} />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-center">{interview.company}</h4>
                <p className="text-sm text-center text-zinc-300 mb-3">{interview.role}</p>

                <div className="flex flex-wrap justify-center gap-2 my-2">
                  {interview.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="bg-[#3a4a5a] text-xs px-3 py-1 rounded-full text-zinc-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <p className="text-center mt-3 text-zinc-400 text-sm">
                  Duration: <span className="text-white font-medium">{interview.duration}</span>
                </p>
              </div>

              <div className="mt-6">
                <button
                  className="w-full bg-[#456179] hover:bg-[#6ca9f3] transition duration-300 text-white font-medium text-sm py-2 px-4 rounded-full shadow hover:shadow-lg cursor-pointer"
                  onClick={() => alert(`Attending interview at ${interview.company}`)}
                >
                  Attend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttendInterviews;
