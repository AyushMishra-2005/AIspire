import React from 'react'

function EducationForm() {
  return (
    <div className="space-y-4 p-2 flex flex-col h-full">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white mt-2 border-b border-white/10 pb-2">
          Education
        </h2>
      </div>

      {/* Grouped Section with Border */}
      <div className="border border-white/10 rounded-lg p-4 space-y-4 bg-white/5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="degree" className="block text-sm font-medium text-gray-300 mb-1">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="B.Tech in Computer Science"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="institution" className="block text-sm font-medium text-gray-300 mb-1">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="IIT Delhi"
            />
          </div>
        </div>

        {/* Start Date & End Date */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* + Add Work Experience Button */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-sm font-medium transition-all duration-200">
          <span className="text-lg">+</span> Add Education
        </button>
      </div>
    </div>
  )
}

export default EducationForm
