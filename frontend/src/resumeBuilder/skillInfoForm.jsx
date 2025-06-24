import React, { useState } from 'react';
import RatingInput from './ratingInput';
import { X } from 'lucide-react';

function SkillInfoForm() {
  const [rating, setRating] = useState({});

  const [skillForms, setSkillForms] = useState([{ id: Date.now() }]);

  const handleRatingChange = (skill, newValue) => {
    setRating((prevRating) => ({
      ...prevRating,
      [skill]: newValue,
    }));
  };

  const addSkillForm = () => {
    setSkillForms([...skillForms, { id: Date.now() }]);
  }

  const removeSkillForm = (id) => {
    setSkillForms(skillForms.filter((skill) => skill.id !== id));
  }

  return (
    <div className="space-y-6 p-4 flex flex-col h-full">
      <div>
        <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
          Skills
        </h2>
      </div>

      {skillForms.map((skillForm, index) => (
        <div
          key={skillForm.id} 
          className="relative border border-white/10 rounded-lg p-6 space-y-4 bg-white/5"
        >
          {skillForms.length > 1 && (
            <button
              onClick={() => removeSkillForm(skillForm.id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              title="Remove this skill"
            >
              <X size={18} />
            </button>
          )}

          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="flex-1">
              <label htmlFor={`skillName-${skillForm.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                id={`skillName-${skillForm.id}`}
                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="TypeScript"
              />
            </div>


            <div className="flex-1">
              <label htmlFor={`skillRating-${skillForm.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Rating: {rating[skillForm.id] ?  ((rating[skillForm.id]) / 20) : 0}/5
              </label>
              <div className="w-full h-12 flex items-center">
                <RatingInput
                  value={rating[skillForm.id]}
                  onChange={(newValue) => handleRatingChange(skillForm.id, newValue)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}



      <div className="mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-sm font-medium transition-all duration-200"
          onClick={addSkillForm}
        >
          <span className="text-lg">+</span> Add Skill
        </button>
      </div>
    </div>
  );
}

export default SkillInfoForm;
