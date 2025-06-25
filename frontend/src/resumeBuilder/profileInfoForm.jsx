import React from 'react'
import ImageSelector from '../components/imageSelector';

function ProfileInfoForm() {
  return (
    <div className="space-y-6 p-2">

      <h2 className="text-xl font-semibold text-white mt-2">
        Personal Information
      </h2>

      <ImageSelector/>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-300 mb-1">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="Frontend Developer"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-1">
          Summary
        </label>
        <textarea
          id="summary"
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="A passionate frontend developer with 5+ years of experience..."
        />
      </div>
    </div>
  )
}

export default ProfileInfoForm