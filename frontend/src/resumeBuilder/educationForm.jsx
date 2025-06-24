import React, { useState } from 'react';
import { X } from 'lucide-react';

function EducationForm() {
  const [educations, setEducations] = useState([{ id: Date.now() }]);

  const addEducation = () => {
    setEducations([...educations, { id: Date.now() }]);
  };

  const removeEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4 p-2 flex flex-col h-full">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white mt-2 border-b border-white/10 pb-2">
          Education
        </h2>
      </div>

      {educations.map((edu, index) => (
        <div
          key={edu.id}
          className="border border-white/10 rounded-lg p-4 space-y-4 bg-white/5 relative"
        >
          {/* Delete Button */}
          {educations.length > 1 && (
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 cursor-pointer"
              title="Remove this education"
            >
              <X size={18} />
            </button>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Degree
              </label>
              <input
                type="text"
                id={`degree-${edu.id}`}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="B.Tech in Computer Science"
              />
            </div>

            <div className="flex-1">
              <label htmlFor={`institution-${edu.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Institution
              </label>
              <input
                type="text"
                id={`institution-${edu.id}`}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="IIT Delhi"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor={`startDate-${edu.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id={`startDate-${edu.id}`}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex-1">
              <label htmlFor={`endDate-${edu.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                id={`endDate-${edu.id}`}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <div className="mt-auto">
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-sm font-medium transition-all duration-200"
        >
          <span className="text-lg">+</span> Add Education
        </button>
      </div>
    </div>
  );
}

export default EducationForm;
