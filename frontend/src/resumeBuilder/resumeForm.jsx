import React, { useState } from 'react';
import './resume.css';
import { Pen, Palette, Trash2, ArrowDownToLine, ArrowLeft, Save, ArrowRight } from "lucide-react";
import StepProgress from './stepProgress';
import { motion, AnimatePresence } from 'framer-motion';

import ProfileInfoForm from './profileInfoForm.jsx'
import ContactInfoForm from './contactInfoForm.jsx'
import WorkExperienceForm from './workExperienceForm.jsx'
import EducationForm from './educationForm.jsx'
import SkillInfoForm from './skillInfoForm.jsx'
import ProjectDetailsForm from './projectDetailsForm.jsx';

const formSteps = [
  { component: <ProfileInfoForm />, label: 'Profile Info', progress: 0 },
  { component: <ContactInfoForm />, label: 'Contact Info', progress: 20  },
  { component: <WorkExperienceForm />, label: 'Work Experiencec', progress: 40 },
  { component: <EducationForm />, label: 'Education', progress: 60 },
  { component: <SkillInfoForm />, label: 'Skills', progress: 80 },
  { component: <ProjectDetailsForm />, label: 'Projects', progress: 100 },
];


function ResumeForm() {

  const [direction, setDirection] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const stepProgress = ((currentStep + 1) / formSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div className="gradient-bg min-h-screen w-screen flex flex-col items-center pt-4">
      <div className="w-[90vw] min-h-[72px] bg-gradient-to-r from-[#1f2d3d] via-[#1a2734] to-[#17212b] 
  backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-10 
  flex items-center justify-between px-6 text-white text-lg font-medium mt-[50px]">

        <div className="flex items-center gap-3">
          <span className="text-white font-semibold text-xl">Frontend Developer</span>
          <Pen className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-all duration-200">
            <Palette className="w-5 h-5 text-white" />
            <span className="hidden md:block">Change Theme</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-sm transition-all duration-200">
            <Trash2 className="w-5 h-5 text-red-400" />
            <span className="hidden md:block text-red-300">Delete</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-sm transition-all duration-200">
            <ArrowDownToLine className="w-5 h-5 text-green-400" />
            <span className="hidden md:block text-green-300">Download</span>
          </button>
        </div>
      </div>

      <div className="w-[90vw] flex flex-col lg:flex-row justify-between gap-6 mt-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 w-full lg:w-1/2 h-[75vh] min-h-[500px] rounded-2xl shadow-2xl text-white p-4">
          <div className="flex flex-col justify-between h-full">
            <StepProgress progress={formSteps[currentStep].progress} />

            <div className="flex-grow overflow-y-auto min-h-0 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute w-full"
                >
                  {formSteps[currentStep].component}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-sm transition-all duration-200 hover:scale-[1.03] disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                <span className="text-white">Back</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/30 hover:bg-blue-500/50 text-sm transition-all duration-200 hover:scale-[1.03]">
                <Save className="w-4 h-4 text-blue-100" />
                <span className="text-blue-200">Save & Exit</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStep === formSteps.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-sm transition-all duration-200 hover:scale-[1.03] disabled:opacity-30"
              >
                <span className="text-white">Next</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>

        {/* Right Container */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 w-full lg:w-1/2 h-[75vh] min-h-[500px] rounded-2xl shadow-2xl p-6 text-white">
          Right Container
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;
