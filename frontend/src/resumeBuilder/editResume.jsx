import React, {useState} from 'react'

function EditResume() {

  const [resumeData, setResumeData] = useState({
    title : "",
    thumbnailLink:"",
    profileInfo : {
      profileImg : null,
      profilePreviewUrl : "",
      fullName : "",
      designation : "",
      summary : ""
    },
    template: {
      theme: "",
      colorPalette: ""
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: ""
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: ""
      }
    ],
    skills: [
      {
        name: "",
        progress: 0,
      }
    ], 
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: ""
      }
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      }
    ],
    languages: [
      {
        name: "",
        progress: 0,
      }
    ],
    interest: [""]
  });

  return (
    <div>EditResume</div>
  )
}

export default EditResume