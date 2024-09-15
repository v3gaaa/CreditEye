import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, FilterIcon, PlusIcon } from '@heroicons/react/outline'

export default function Dashboard() {
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', status: 'Under Review', riskScore: 75, hasIssues: false },
    { id: 2, name: 'Jane Smith', status: 'Submitted', riskScore: 60, hasIssues: true },
    // Add more mock data as needed
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Applications Dashboard</h1>
        <Link
          to="/add-credit-request"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Credit Request
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search applications..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
        </div>
        <button className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow hover:bg-gray-50">
          <FilterIcon className="h-5 w-5 text-gray-600" />
          <span>Filter</span>
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{app.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 
                    app.status === 'Submitted' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {app.riskScore}
                  {app.hasIssues && (
                    <span className="ml-2 text-red-500">⚠️</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/application/${app.id}`} className="text-blue-600 hover:text-blue-900">
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}