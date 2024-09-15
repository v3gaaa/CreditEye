import React, { useState } from 'react'
import { UploadIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'

export default function DocumentUpload() {
  const [documents, setDocuments] = useState([])
  const [currentUpload, setCurrentUpload] = useState({ file: null, type: '' })

  const documentTypes = [
    'ID',
    'Proof of Address',
    'Proof of Income',
    'Bank Statement'
  ]

  const handleFileChange = (e) => {
    setCurrentUpload({ ...currentUpload, file: e.target.files[0] })
  }

  const handleTypeChange = (e) => {
    setCurrentUpload({ ...currentUpload, type: e.target.value })
  }

  const handleUpload = () => {
    if (currentUpload.file && currentUpload.type) {
      // Here you would typically send the file to your backend
      // For this example, we'll just add it to our local state
      setDocuments([...documents, currentUpload])
      setCurrentUpload({ file: null, type: '' })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Document Upload</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Document Type</label>
          <select
            value={currentUpload.type}
            onChange={handleTypeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select a document type</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Document</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleUpload}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload Document
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.file.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <CheckCircleIcon className="h-5 w-5 mr-1" /> Uploaded
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}