import React from 'react'

function ContactInfoForm() {
  return (
    <div className="space-y-6 p-2 flex flex-col justify-evenly">

      <div>
        <h2 className="text-xl font-semibold text-white mt-2">
          Contact Information
        </h2>
      </div>

      <div className="flex-1">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
          Address
        </label>
        <input
          type="text"
          id="fullName"
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="Short Address"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="John@gmail.com"
          />
        </div>

        {/* Designation Input */}
        <div className="flex-1">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="9078343277"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            LinkedIn
          </label>
          <input
            type="text"
            id="linkedIn"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        {/* Designation Input */}
        <div className="flex-1">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-300 mb-1">
            GintHub
          </label>
          <input
            type="text"
            id="gitHub"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      <div className="flex-1">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
          Portfolio / Website
        </label>
        <input
          type="text"
          id="Portfolio"
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="https://yourwebsite.com"
        />
      </div>


    </div>
  )
}

export default ContactInfoForm