import { useState } from 'react'
import { Upload, CloudUpload, FileText, Image, CreditCard, DollarSign, FileCheck, AlertTriangle, Clock, Search, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ComplexDocumentUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
    simulateUpload()
  }

  const simulateUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-50 p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">Document Management System</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="John Doe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profile">View Profile</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upload Your Documents</CardTitle>
            <CardDescription>Drag and drop your files or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors">
              <CloudUpload className="w-16 h-16 text-blue-500 mb-4" />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => document.getElementById('fileInput').click()}>
                Select Files
              </Button>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <p className="mt-2 text-sm text-gray-600">or drag and drop your files here</p>
            </div>
            {uploadProgress > 0 && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Document Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['PDF', 'JPG', 'DOCX', 'XLS', 'TXT'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type.toLowerCase()} />
                    <label htmlFor={type.toLowerCase()} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>File Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input type="text" placeholder="Document Title" className="w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="text" placeholder="Author" />
                  <Input type="date" placeholder="Date" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
                <textarea className="w-full h-24 p-2 border rounded-md" placeholder="Additional notes..."></textarea>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedFiles.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="success">Uploaded</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Tabs defaultValue="credit">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credit">Credit Evaluation</TabsTrigger>
            <TabsTrigger value="income">Income Evaluation</TabsTrigger>
            <TabsTrigger value="document">Document Evaluation</TabsTrigger>
          </TabsList>
          <TabsContent value="credit">
            <Card>
              <CardHeader>
                <CardTitle>Credit Evaluation</CardTitle>
                <CardDescription>Review and analyze credit-related documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">Credit Score</h3>
                      <p className="text-sm text-gray-600">Last updated: 2 days ago</p>
                    </div>
                  </div>
                  <Progress value={75} className="w-full" />
                  <p className="text-sm text-gray-600">Your credit score is good (750)</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Request Full Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Income Evaluation</CardTitle>
                <CardDescription>Analyze income statements and financial documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Annual Income</h3>
                      <p className="text-sm text-gray-600">Based on uploaded documents</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">$75,000</p>
                  <p className="text-sm text-gray-600">This is an estimate based on your recent uploads</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Verify Income</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="document">
            <Card>
              <CardHeader>
                <CardTitle>Document Evaluation</CardTitle>
                <CardDescription>Analyze and verify uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FileCheck className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold">Document Status</h3>
                      <p className="text-sm text-gray-600">Overall verification progress</p>
                    </div>
                  </div>
                  <Progress value={60} className="w-full" />
                  <p className="text-sm text-gray-600">60% of your documents have been verified</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>View Detailed Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2023 Document Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}