import { create } from 'zustand';
const useResumeStore = create((set) => ({
  resumeData: {
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: ""
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
        progress: 0
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
        year: ""
      }
    ],
    languages: [
      {
        name: "",
        progress: 0
      }
    ],
    interest: [
      {
        name : ""
      }
    ]
  },

  setResumeData: (resumeData) => set({ resumeData }),

  updateResumeField: (section, key, value) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [section]: {
          ...state.resumeData[section],
          [key]: value,
        },
      },
    }));
  },

  updateArrayItemField: (section, index, key, value) => {
    set((state) => {
      const updated = [...state.resumeData[section]];
      updated[index] = {...updated[index], [key]: value};
      return{
        resumeData: {
          ...state.resumeData,
          [section]: updated
        },
      };
    });
  },


  addArrayItem: (section, emptyItem) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [section]: [...state.resumeData[section], emptyItem]
      }
    }));
  },

  removeArrayItem: (section, index) => {
    set((state) => {
      const updated = [...state.resumeData[section]];
      updated.splice(index, 1);

      return{
        resumeData: {
          ...state.resumeData,
          [section]: updated,
        }
      }
    });
  }


}));


export default useResumeStore;