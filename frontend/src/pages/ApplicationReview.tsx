'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, AlertTriangle, Loader } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function ApplicationReview() {
  const { id } = useParams()
  const [application, setApplication] = useState(null)
  const [applicationOverview, setApplicationOverview] = useState(null)
  const [loadingOverview, setLoadingOverview] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingRiskScore, setEditingRiskScore] = useState(false)
  const [newRiskScore, setNewRiskScore] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchApplicantInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get-review-info/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch applicant information')
        }
        const data = await response.json()

        setApplication({
          id,
          name: data.name || 'Unknown',
          email: data.email || 'Unknown',
          income: `$${data.income.toLocaleString()}`,
          status: data.status || 'Pending',
          riskScore: data.credit_score || 0,
          documents: Object.entries(data.documents).map(([type, details]) => ({
            type,
            issues: !details.legible,
            file_id: type.replace(/ /g, '_')  // Assuming file_id is generated from type
          })),
        })
        setNewRiskScore(75) // Initial risk score
      } catch (error) {
        console.error('Error fetching applicant information:', error)
      }
    }

    fetchApplicantInfo()
  }, [id])

  const getRiskScoreColor = (score) => {
    if (score < 50) return 'bg-green-100 text-green-800'
    if (score < 75) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'More Info':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDocumentIcon = (issues) => {
    return issues ? <AlertCircle className="h-5 w-5 text-yellow-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />
  }

  const handleGenerateOverview = async () => {
    try {
      setLoadingOverview(true)
      const response = await fetch(`http://localhost:8000/get-review-desc/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch review description')
      }
      const data = await response.json()

      setApplicationOverview({
        shouldApprove: data.should_approve,
        explanation: data.explanation,
        relevantData: data.relevant_data,
      })
      toast({
        title: "Overview Generated",
        description: "The application overview has been generated successfully.",
      })
    } catch (error) {
      console.error('Error generating overview:', error)
      toast({
        title: "Error",
        description: "Failed to generate application overview. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingOverview(false)
    }
  }

  const handleRiskScoreChange = (e) => {
    setNewRiskScore(e.target.value)
  }

  const handleRiskScoreUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/edit-risk-score/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ risk_score: newRiskScore }),
      })

      if (!response.ok) {
        throw new Error('Failed to update risk score')
      }

      const data = await response.json()
      if (data.status === 'success') {
        setApplication((prev) => ({ ...prev, riskScore: newRiskScore }))
        toast({
          title: "Risk Score Updated",
          description: "The risk score has been successfully updated.",
        })
      } else {
        throw new Error(data.message || 'Failed to update risk score')
      }
    } catch (error) {
      console.error('Error updating risk score:', error)
      toast({
        title: "Error",
        description: "Failed to update risk score. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleStatusUpdate = async (newStatus) => {
    const endpointMap = {
      'Rejected': 'reject-request',
      'More Info': 'request-more-info',
      'Approved': 'approve-request'
    }
    
    try {
      const response = await fetch(`http://localhost:8000/${endpointMap[newStatus]}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${newStatus.toLowerCase()} the request`)
      }

      const data = await response.json()
      if (data.status === 'success') {
        setApplication((prev) => ({ ...prev, status: newStatus }))
        toast({
          title: `${newStatus} Successful`,
          description: `The request has been ${newStatus.toLowerCase()}ed successfully.`,
        })
      } else {
        throw new Error(data.message || `Failed to ${newStatus.toLowerCase()} the request`)
      }
    } catch (error) {
      console.error(`Error ${newStatus.toLowerCase()}ing request:`, error)
      toast({
        title: "Error",
        description: `Failed to ${newStatus.toLowerCase()} the request. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleDocumentView = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:8000/get-document/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_id: fileId }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch document')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    } catch (error) {
      console.error('Error fetching document:', error)
      toast({
        title: "Error",
        description: "Failed to fetch the document. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDocumentUpload = async (e, fileId) => {
    const newDocument = e.target.files[0]
    if (!newDocument) return

    const formData = new FormData()
    formData.append('name', application.name)
    formData.append('email', application.email)
    formData.append('phone', application.phone)
    formData.append('annual_income', parseFloat(application.income.replace(/[^\d.]/g, '')))
    formData.append('risk_score', application.riskScore)
    formData.append('status', application.status)
    formData.append('documents', newDocument)

    try {
      const response = await fetch(`http://localhost:8000/update-review-info/${id}/`, {
        method: 'PUT',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to update document')
      }

      const data = await response.json()
      if (data.status === 'success') {
        toast({
          title: "Document Updated",
          description: "The document has been updated and re-analyzed successfully.",
        })
        setApplication((prev) => ({
          ...prev,
          documents: prev.documents.map(doc =>
            doc.file_id === fileId ? { ...doc, issues: false } : doc
          ),
        }))
      } else {
        throw new Error(data.message || 'Failed to update document')
      }
    } catch (error) {
      console.error('Error updating document:', error)
      toast({
        title: "Error",
        description: "Failed to update the document. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Application Review</h1>
      <Badge variant="outline" className={getStatusColor(application?.status)}>
        {application?.status}
      </Badge>
      
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
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Risk Score</p>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={getRiskScoreColor(application?.riskScore)}>
                {application?.riskScore}
              </Badge>
              {editingRiskScore ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={newRiskScore}
                    onChange={handleRiskScoreChange}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <Button onClick={handleRiskScoreUpdate} variant="primary">Update</Button>
                  <Button onClick={() => setEditingRiskScore(false)} variant="ghost">Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setEditingRiskScore(true)} variant="secondary">
                  Edit Risk Score
                </Button>
              )}
            </div>
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
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDocumentView(document.type)}>View</Button>
                    {document.issues && (
                      <div>
                        <Input type="file" onChange={(e) => handleDocumentUpload(e, document.file_id)} className="sr-only" id={`file-upload-${document.file_id}`} />
                        <label htmlFor={`file-upload-${document.file_id}`} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                          Re-upload
                        </label>
                      </div>
                    )}
                  </div>
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
        <Button variant="destructive" onClick={() => handleStatusUpdate('Rejected')}>
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button variant="secondary" onClick={() => handleStatusUpdate('More Info')}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Request More Info
        </Button>
        <Button variant="default" onClick={() => handleStatusUpdate('Approved')}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </div>

      {previewUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-2/3 h-3/4 overflow-auto">
            <iframe src={previewUrl} className="w-full h-full" title="Document Preview"></iframe>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setPreviewUrl(null)} variant="default">Close</Button>
            </div>
          </div>
        </div>
      )}

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
