import StatusParameterSection from "@/components/apidocs/StatusParameterSection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function APIDocsPage() {
  return (
    <div className="min-h-screen text-gray-800 px-6 py-12 space-y-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admin API */}
        <div className="border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Admin API</h2>
          <p className="mb-4 text-gray-400">
            HTTPS requests to the address must be made to invoke API methods:
          </p>
          <div className="flex items-center gap-2">
            <Input
              value="https://ngatrapanel.my.id/privateApi"
              readOnly
              className="text-sm border border-gray-700 text-gray-800"
            />
            <Button size="icon" variant="outline" className="border-gray-700">
              <Copy className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Token */}
        <div className="border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Your token</h2>
          <p className="mb-4 text-gray-400">
            To every query you need to add your access key in parameter token.
          </p>
          <div className="flex items-center gap-2">
            <Input
              value="..."
              readOnly
              className="text-sm border border-gray-700 "
            />
            <Button size="icon" variant="outline" className="border-gray-700">
              <Copy className="h-4 w-4 text-gray-400" />
            </Button>
            <Button variant="outline" className="border-gray-700 text-blue-500">
              Change
            </Button>
          </div>
        </div>
      </div>

      {/* Get Orders Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Get orders</h2>
        <p className="mb-4 text-gray-400">Use this method to get orders</p>

        <div className="space-y-2">
          <Label className="text-sm text-gray-400">Request sample</Label>
          <div className="flex items-center gap-2">
            <Input
              value="https://ngatrapanel.my.id/privateApi/getOrders?status={status}&order_ids={order_ids}&limit={limit}&offset={offset}&service_id={service_id}&token={token}"
              readOnly
              className="text-sm border border-gray-700"
            />
            <Button size="icon" variant="outline" className="border-gray-700">
              <Copy className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
        <StatusParameterSection/>
        <Card className="mt-6">
          <CardHeader className="font-semibold">Response sample</CardHeader>
          <CardContent>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => {
                  navigator.clipboard.writeText(`{
  "count": 1802130,
  "items": [
    {
      "id": 1234,
      "charge": "0",
      "start_count": 0,
      "status": "canceled",
      "remains": "10",
      "currency": "USD",
      "service_id": 123,
      "user": {
        "id": 123,
        "login": "userLogin"
      }
    }
  ]
}`)
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
{`{
  "count": `}<span className="text-blue-600">1802130</span>{`,
  "items": [
    {
      "id": `}<span className="text-blue-600">1234</span>{`,
      "charge": "`}<span className="text-green-600">0</span>{`",
      "start_count": `}<span className="text-blue-600">0</span>{`,
      "status": "`}<span className="text-green-600">canceled</span>{`",
      "remains": "`}<span className="text-green-600">10</span>{`",
      "currency": "`}<span className="text-green-600">USD</span>{`",
      "service_id": `}<span className="text-blue-600">123</span>{`,
      "user": {
        "id": `}<span className="text-blue-600">123</span>{`,
        "login": "`}<span className="text-green-600">userLogin</span>{`"
      }
    }
  ]
}`}
              </pre>
            </div>
            <div className="mt-4">
              <p className="font-medium mb-2">The method returns an object containing the following fields:</p>
              <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex gap-4">
                  <span className="font-mono text-sm font-medium">count</span>
                  <span className="text-sm text-muted-foreground">Integer</span>
                  <span className="text-sm">Amount of orders found by request</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}