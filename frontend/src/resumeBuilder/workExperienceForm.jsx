import React from 'react'

function WorkExperienceForm() {
  return (
    <div className="space-y-4 p-2 flex flex-col h-full">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white mt-2 border-b border-white/10 pb-2">
          Work Experience
        </h2>
      </div>

      {/* Company & Role */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="ABC Company"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="Frontend Developer"
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

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                  focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="What did you do in this role?"
        />
      </div>

      {/* + Add Work Experience Button */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-sm font-medium transition-all duration-200">
          <span className="text-lg">+</span> Add Work Experience
        </button>
      </div>
    </div>
  )
}

export default WorkExperienceForm
