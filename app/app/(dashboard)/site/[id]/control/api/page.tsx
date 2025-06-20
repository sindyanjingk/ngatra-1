import StatusParameterSection from "@/components/apidocs/StatusParameterSection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"

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
      </div>
    </div>
  )
}
