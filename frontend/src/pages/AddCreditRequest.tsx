import { useState } from 'react'
import { UploadIcon } from '@heroicons/react/outline'
import axios from 'axios'

export default function AddCreditRequest() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    annual_income: '',
    status: '',
    risk_score: '',
  })
  const [documents, setDocuments] = useState({
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
    const { name, files } = e.target; // Corregir 'documents' por 'files'
    setDocuments(prev => ({ ...prev, [name]: files[0] })); // Acceder correctamente a files[0]
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    
    // Agregar la información del cliente
    Object.keys(customerInfo).forEach(key => {
      formData.append(key, customerInfo[key]);
    });
  
    // Crear un objeto para agrupar todos los archivos
    const documentsObj = [];
  
    // Añadir los documentos a la lista
    Object.keys(documents).forEach(key => {
      if (documents[key]) {
        documentsObj.push(documents[key]);
      }
    });
  
    // Agregar todos los documentos bajo un solo campo 'documents'
    formData.append('documents', JSON.stringify(documentsObj)); // Convertir a JSON los documentos.
  
    try {
      const response = await axios.post('https://d23e-131-178-102-188.ngrok-free.app/send-info', formData);
  
      if (response.status !== 200) {
        throw new Error('Failed to submit credit request');
      }
  
      const data = response.data;
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
            value={customerInfo.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700">Annual Income</label>
          <input
            type="number"
            name="annual_income"
            id="annual_income"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
            value={customerInfo.annual_income}
            onChange={handleInputChange}
            step="100"
            min="0"        
          />
        </div>
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
            value={customerInfo.status}
            onChange={handleInputChange}       
          />
        </div>

        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700">Risk score</label>
          <input
            type="text"
            name="risk_score"
            id="risk_score"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
            value={customerInfo.risk_score}
            onChange={handleInputChange}
            step="100"
            min="0"        
          />
        </div>


        {/* ID Document */}
        <div className="flex flex-col items-center">
          <label htmlFor="id" className="text-sm font-medium text-gray-500 mb-2">ID Document</label>
          <div className="relative w-full">
            <input
              type="file"
              name="id"
              id="id"
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="id"
              className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 bg-white hover:bg-gray-50 cursor-pointer"
            >
              {documents.id ? documents.id.name : 'Select file'}
            </label>
          </div>
        </div>

        {/* Proof of Income */}
        <div className="flex flex-col items-center">
          <label htmlFor="proofOfIncome" className="text-sm font-medium text-gray-500 mb-2">Proof of Income</label>
          <div className="relative w-full">
            <input
              type="file"
              name="proofOfIncome"
              id="proofOfIncome"
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="proofOfIncome"
              className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 bg-white hover:bg-gray-50 cursor-pointer"
            >
              {documents.proofOfIncome ? documents.proofOfIncome.name : 'Select file'}
            </label>
          </div>
        </div>

        {/* Bank Statements */}
        <div className="flex flex-col items-center">
          <label htmlFor="bankStatements" className="text-sm font-medium text-gray-500 mb-2">Bank Statements</label>
          <div className="relative w-full">
            <input
              type="file"
              name="bankStatements"
              id="bankStatements"
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="bankStatements"
              className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 bg-white hover:bg-gray-50 cursor-pointer"
            >
              {documents.bankStatements ? documents.bankStatements.name : 'Select file'}
            </label>
          </div>
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
