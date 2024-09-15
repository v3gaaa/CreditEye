import React, { useState } from 'react'
import { UploadIcon } from '@heroicons/react/outline'

export default function AddCreditRequest() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    income: '',
  })
  const [files, setFiles] = useState({
    id: null,
    proofOfIncome: null,
    bankStatements: null,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFiles(prev => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Create a FormData object to send files
    const formData = new FormData()
    Object.keys(customerInfo).forEach(key => {
      formData.append(key, customerInfo[key])
    })
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formData.append(key, files[key])
      }
    })

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/credit-request', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit credit request')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({ error: 'Failed to process credit request. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Credit Request</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={customerInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={customerInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={customerInfo.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700">Annual Income</label>
          <input
            type="number"
            name="income"
            id="income"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={customerInfo.income}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID Document</label>
          <input
            type="file"
            name="id"
            id="id"
            required
            className="mt-1 block w-full"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="proofOfIncome" className="block text-sm font-medium text-gray-700">Proof of Income</label>
          <input
            type="file"
            name="proofOfIncome"
            id="proofOfIncome"
            required
            className="mt-1 block w-full"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="bankStatements" className="block text-sm font-medium text-gray-700">Bank Statements</label>
          <input
            type="file"
            name="bankStatements"
            id="bankStatements"
            required
            className="mt-1 block w-full"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Processing...' : 'Submit Credit Request'}
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Credit Request Result</h2>
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <p className="font-medium">Credit Eligibility: {result.eligible ? 'Eligible' : 'Not Eligible'}</p>
              <p className="mt-2">{result.explanation}</p>
              {result.relevantData && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Relevant Data:</h3>
                  <ul className="list-disc list-inside">
                    {Object.entries(result.relevantData).map(([key, value]) => (
                      <li key={key}>{key}: {value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}