import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewCreditRequestModal({ isOpen, onClose }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    income: '',
    employmentStatus: '',
    additionalInfo: ''
  })

  const [files, setFiles] = useState({
    id: null,
    proofOfIncome: null,
    bankStatements: null
  })

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
    // Here you would typically send the data to your backend
    // For this example, we'll simulate a response
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Simulate response
    setResult({
      eligible: Math.random() > 0.5,
      explanation: "Based on the provided information and documents, the customer appears to have a stable income and good credit history. However, the debt-to-income ratio is slightly higher than our preferred threshold.",
      relevantData: {
        annualIncome: "$75,000",
        creditScore: 720,
        debtToIncomeRatio: "38%"
      }
    })
  }

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                New Credit Request
              </Dialog.Title>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <XIcon className="h-6 w-6" />
              </button>

              <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    name="income"
                    type="number"
                    value={customerInfo.income}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Input
                    id="employmentStatus"
                    name="employmentStatus"
                    value={customerInfo.employmentStatus}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={customerInfo.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="id">ID Document</Label>
                  <Input
                    id="id"
                    name="id"
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="proofOfIncome">Proof of Income</Label>
                  <Input
                    id="proofOfIncome"
                    name="proofOfIncome"
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bankStatements">Bank Statements</Label>
                  <Input
                    id="bankStatements"
                    name="bankStatements"
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Credit Request
                </Button>
              </form>

              {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Credit Assessment Result</h4>
                  <p className={result.eligible ? "text-green-600" : "text-red-600"}>
                    {result.eligible ? "Eligible for Credit" : "Not Eligible for Credit"}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">{result.explanation}</p>
                  <div className="mt-4">
                    <h5 className="font-semibold">Relevant Data:</h5>
                    <ul className="list-disc list-inside">
                      {Object.entries(result.relevantData).map(([key, value]) => (
                        <li key={key} className="text-sm">
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}