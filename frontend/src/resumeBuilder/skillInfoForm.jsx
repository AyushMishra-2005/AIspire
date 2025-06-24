import React, { useState } from 'react';
import RatingInput from './ratingInput';

function SkillInfoForm() {
  const [rating, setRating] = useState({
    typeScript: 0,
  });

  const handleRatingChange = (skill, newValue) => {
    setRating((prevRating) => ({
      ...prevRating,
      [skill]: newValue,
    }));
  };

  return (
    <div className="space-y-6 p-4 flex flex-col h-full">
      <div>
        <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
          Skills
        </h2>
      </div>

      <div className="border border-white/10 rounded-lg p-6 space-y-4 bg-white/5">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
         
          <div className="flex-1">
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-300 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              id="skillName"
              className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="TypeScript"
            />
          </div>


          <div className="flex-1">
            <label htmlFor="skillRating" className="block text-sm font-medium text-gray-300 mb-1">
              Rating: {(rating.typeScript) / 20}/5
            </label>
            <div className="w-full h-12 flex items-center">
              <RatingInput
                value={rating.typeScript}
                onChange={(newValue) => handleRatingChange('typeScript', newValue)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-sm font-medium transition-all duration-200">
          <span className="text-lg">+</span> Add Skill
        </button>
      </div>
    </div>
  );
}

export default SkillInfoForm;
