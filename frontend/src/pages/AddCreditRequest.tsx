'use client'

import { useState } from 'react'
import { Upload, DollarSign, Mail, Phone, User, FileText, CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AddCreditRequest() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    annual_income: '',
  })
  const [documents, setDocuments] = useState({
    id: null,
    proofOfIncome: null,
    bankStatements: null,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setDocuments(prev => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()

    // Agregar la información del cliente al formData
    formData.append('name', customerInfo.name)
    formData.append('email', customerInfo.email)
    formData.append('phone', customerInfo.phone)
    formData.append('annual_income', customerInfo.annual_income)

    // Agregar los documentos al formData
    Object.keys(documents).forEach(key => {
      if (documents[key]) {
        formData.append('documents', documents[key])
      }
    })

    try {
      const response = await fetch('http://localhost:8000/send-info', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit credit request')
      }

      const data = await response.json()
      setResult(data)

      toast({
        title: "Credit Request Submitted",
        description: "Your credit request has been successfully submitted.",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to submit credit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Add New Credit Request</CardTitle>
        <CardDescription>Fill in the customer details and upload required documents</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Diego Cisneros"
                  required
                  className="pl-8"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="diego@example.com"
                  required
                  className="pl-8"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(33) 3451 2028"
                  required
                  className="pl-8"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="annual_income">Annual Income</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  id="annual_income"
                  name="annual_income"
                  placeholder="50000"
                  required
                  className="pl-8"
                  value={customerInfo.annual_income}
                  onChange={handleInputChange}
                  step="100"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Required Documents</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['id', 'proofOfIncome', 'bankStatements'].map((docType) => (
                <div key={docType} className="flex flex-col items-center">
                  <Label htmlFor={docType} className="mb-2">
                    {docType === 'id' ? 'ID Document' : 
                     docType === 'proofOfIncome' ? 'Proof of Income' : 'Bank Statements'}
                  </Label>
                  <div className="relative w-full">
                    <Input
                      type="file"
                      id={docType}
                      name={docType}
                      required
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor={docType}
                      className="flex items-center justify-center w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      {documents[docType] ? (
                        <FileText className="h-6 w-6 text-blue-500" />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-400" />
                      )}
                      <span className="ml-2 text-sm text-gray-600">
                        {documents[docType] ? documents[docType].name : 'Select file'}
                      </span>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <CreditCard className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Submit Credit Request
            </>
          )}
        </Button>
      </CardFooter>
      {result && (
        <CardContent className="mt-6 bg-muted rounded-md">
          <h2 className="text-xl font-semibold mb-2">Credit Request Result</h2>
          {result.error ? (
            <p className="text-destructive">{result.error}</p>
          ) : (
            <>
              <p className="text-green-600">Credit request submitted successfully!</p>
              <p className="text-sm text-muted-foreground mt-2">Application ID: {result.request_id}</p>
              {result.uploaded_files && result.uploaded_files.map(file => (
                <p key={file.file_id} className="text-sm text-muted-foreground">
                  {file.filename} - <a href={file.file_url} target="_blank" className="text-blue-600">View File</a>
                </p>
              ))}
            </>
          )}
        </CardContent>
      )}
    </Card>
  )
}
