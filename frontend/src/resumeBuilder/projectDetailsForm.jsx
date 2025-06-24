import React from 'react'

function ProjectDetailsForm() {
  return (
    <div className="space-y-2 p-2 flex flex-col h-full">
      <div>
        <h2 className="text-xl font-semibold text-white mt-2 border-b border-white/10 pb-2">
          Projects
        </h2>
      </div>

      <div className="border border-white/10 rounded-lg p-4 space-y-4 bg-white/5">

        <div className="flex-1">
          <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-300 mb-1">
            Project Title
          </label>
          <input
            type="text"
            id="projectTitle"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="AIspire"
          />
        </div>

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
            placeholder="Short description about the project"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="githubLink" className="block text-sm font-medium text-gray-300 mb-1">
              GitHub Link
            </label>
            <input
              type="text"
              id="githubLink"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="https://github.com/username/project"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-300 mb-1">
              Live Demo URL
            </label>
            <input
              type="text"
              id="demoUrl"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      {/* + Add Work Experience Button */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-sm font-medium transition-all duration-200">
          <span className="text-lg">+</span> Add Project
        </button>
      </div>
    </div>
  )
}

export default ProjectDetailsForm