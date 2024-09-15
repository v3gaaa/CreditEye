import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader } from 'lucide-react'

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState([
    { name: 'Authentication Service', status: 'Operational' },
    { name: 'Document Verification', status: 'Operational' },
    { name: 'Risk Assessment', status: 'Degraded Performance' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate an API call to fetch the latest status
    setTimeout(() => {
      setLoading(false)
      // Update API status here based on the actual API response
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Operational':
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>
      case 'Degraded Performance':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded Performance</Badge>
      case 'Down':
        return <Badge className="bg-red-100 text-red-800">Down</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">API Status</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="h-10 w-10 text-gray-500 animate-spin" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Current API Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Below is the current operational status of our key services. We continuously monitor all services to ensure maximum uptime and performance.
            </p>
            <ul className="space-y-2">
              {apiStatus.map((service, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{service.name}</span>
                  {getStatusBadge(service.status)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
