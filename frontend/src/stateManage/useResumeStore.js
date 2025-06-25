import { create } from 'zustand';
const useResumeStore = create((set) => ({
  resumeData: {
    title: "Frontend Developer Resume",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", 
      fullName: "Ayush Mishra",
      designation: "Frontend Developer",
      summary: "A passionate frontend developer with experience in building responsive web applications using React, Tailwind CSS, and modern JavaScript libraries.",
    },
    template: {
      theme: "modern",
      colorPalette: "blue",
    },
    contactInfo: {
      email: "ayush@example.com",
      phone: "+91 9876543210",
      location: "Mumbai, India",
      linkedin: "linkedin.com/in/ayushmishra",
      github: "github.com/ayushdev",
      website: "ayush.dev",
    },
    workExperience: [
      {
        company: "TechNova Solutions",
        role: "Frontend Engineer",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Built and maintained dynamic web interfaces using React, integrated REST APIs, and improved performance by 30%.",
      },
      {
        company: "DevWorks Studio",
        role: "Web Developer Intern",
        startDate: "May 2021",
        endDate: "Dec 2021",
        description: "Assisted in building company portfolio website, optimized assets, and collaborated with backend team for API integration.",
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "IIT Bombay",
        startDate: "2018",
        endDate: "2022",
      }
    ],
    skills: [
      { name: "React.js", progress: 90 },
      { name: "JavaScript", progress: 85 },
      { name: "HTML/CSS", progress: 95 },
      { name: "Tailwind CSS", progress: 80 },
    ],
    projects: [
      {
        title: "Portfolio Website",
        description: "Personal portfolio website built with React and Tailwind CSS, showcasing projects and blogs.",
        github: "github.com/ayushdev/portfolio",
        liveDemo: "https://ayush.dev",
      },
      {
        title: "Resume Builder",
        description: "A resume generator app with live preview and PDF export functionality.",
        github: "github.com/ayushdev/resume-builder",
        liveDemo: "",
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website built with React and Tailwind CSS, showcasing projects and blogs.",
        github: "github.com/ayushdev/portfolio",
        liveDemo: "https://ayush.dev",
      },
      {
        title: "Resume Builder",
        description: "A resume generator app with live preview and PDF export functionality.",
        github: "github.com/ayushdev/resume-builder",
        liveDemo: "",
      }
    ],
    certifications: [
      {
        title: "React Developer Certification",
        issuer: "Coursera",
        year: "2023",
      },
      {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        year: "2022",
      }
    ],
    languages: [
      { name: "English", progress: 100 },
      { name: "Hindi", progress: 100 },
    ],
    interest: ["Open Source", "Gaming", "Traveling", "UI/UX Design"],
  },

  setResumeData: (resumeData) => set({ resumeData }),
}));

export default useResumeStore;