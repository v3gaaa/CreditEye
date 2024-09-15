import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

export default function OnboardingGuide() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Welcome to the Credit Verification System</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Here's a quick guide to get you started:
            </p>
            <ul className="mt-4 text-sm text-gray-700 text-left list-disc list-inside">
              <li>Upload your documents (ID, proof of income, etc.)</li>
              <li>Fill out your application details</li>
              <li>Track your application status in your profile</li>
              <li>Respond promptly if additional information is requested</li>
            </ul>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}