'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertCircle, AlertTriangle, Loader } from 'lucide-react'

export default function ApplicationReview({ id = '123' }) {
  const [application, setApplication] = useState(null)
  const [applicationOverview, setApplicationOverview] = useState(null)
  const [loadingOverview, setLoadingOverview] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Simulating API call
    setApplication({
      id,
      name: 'John Doe',
      email: 'john@example.com',
      income: '$50,000',
      creditScore: 720,
      riskScore: 75,
      documents: [
        { type: 'ID', issues: false },
        { type: 'Proof of Income', issues: false },
        { type: 'Bank Statement', issues: false },
      ]
    })
  }, [id])

  const getRiskScoreColor = (score) => {
    if (score < 50) return 'bg-green-100 text-green-800'
    if (score < 75) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getDocumentIcon = (issues) => {
    return issues ? <AlertCircle className="h-5 w-5 text-yellow-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />
  }

  const handleGenerateOverview = () => {
    const hasIssues = application.documents.some((doc) => doc.issues)

    if (hasIssues) {
      setShowModal(true)
      return
    }

    setLoadingOverview(true)

    // Simulating API call for generating application overview
    setTimeout(() => {
      setApplicationOverview({
        shouldApprove: true, // Placeholder boolean value
        explanation: 'This decision is based on a strong credit history and a low debt-to-income ratio.', // Placeholder explanation
        relevantData: { // Placeholder relevant data
          'Income Verified': 'Yes',
          'Debt-to-Income Ratio': 'Low',
          'Credit History': 'Good',
        },
      })
      setLoadingOverview(false)
    }, 2000) // Simulating a delay
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Application Review</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Applicant Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full name</p>
              <p className="text-lg font-semibold">{application?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email address</p>
              <p className="text-lg font-semibold">{application?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Income</p>
              <p className="text-lg font-semibold">{application?.income}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
              <p className="text-lg font-semibold">{application?.creditScore}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Risk Score</p>
            <Badge variant="outline" className={getRiskScoreColor(application?.riskScore)}>
              {application?.riskScore}
            </Badge>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Documents</p>
            <ul className="space-y-2">
              {application?.documents.map((document, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getDocumentIcon(document.issues)}
                    <span>{document.type}</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Overview</CardTitle>
          <CardDescription>AI-generated summary and recommendation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!applicationOverview ? (
            <Button onClick={handleGenerateOverview} disabled={loadingOverview}>
              {loadingOverview ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Overview'
              )}
            </Button>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Should Approve:</p>
                <Badge
                  className={`${
                    applicationOverview.shouldApprove ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {applicationOverview.shouldApprove ? 'Yes' : 'No'}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Explanation:</p>
                <p className="text-sm text-muted-foreground">{applicationOverview.explanation}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Relevant Data:</p>
                <ul className="grid grid-cols-2 gap-2">
                  {Object.entries(applicationOverview.relevantData).map(([key, value]) => (
                    <li key={key} className="flex items-center space-x-2">
                      <Badge variant="outline">{key}</Badge>
                      <span className="text-sm">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="destructive">
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button variant="secondary">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Request More Info
        </Button>
        <Button variant="default">
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Issues Detected</h2>
            <p className="text-sm text-gray-700 mb-4">
              Please resolve all document issues before generating the overview.
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setShowModal(false)} variant="default">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
