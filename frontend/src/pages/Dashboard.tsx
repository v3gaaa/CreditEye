import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, FilterIcon, PlusIcon } from '@heroicons/react/outline'

export default function Dashboard() {
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', status: 'Under Review', riskScore: 75, hasIssues: false },
    { id: 2, name: 'Jane Smith', status: 'Submitted', riskScore: 60, hasIssues: true },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showIssuesOnly, setShowIssuesOnly] = useState(false)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterToggle = () => {
    setShowIssuesOnly((prev) => !prev)
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = showIssuesOnly ? app.hasIssues : true
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/add-credit-request"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Credit Request
        </Link>
      </div>
      <div className="flex justify-between items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={handleFilterToggle}
          className={`flex items-center space-x-2 p-2 rounded-lg shadow ${
            showIssuesOnly ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <FilterIcon className="h-5 w-5" />
          <span>{showIssuesOnly ? 'Showing Issues' : 'Show Issues Only'}</span>
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
            {filteredApplications.map((app) => (
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
