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

      <div className="space-y-8">
        <StatusParameterSection />

        {/* Response Fields Documentation */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">The method returns an object containing the following fields:</h3>

          <div className="space-y-4">
            <div className="border-l-2 border-blue-600 pl-4 space-y-3">
              <div className="flex items-start gap-4">
                <span className="font-medium min-w-20">count</span>
                <span className="text-blue-600 text-sm">Integer</span>
                <span className="text-gray-600">Amount of orders found by request</span>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-medium min-w-20">items</span>
                <span className="text-blue-600 text-sm">Array</span>
                <span className="text-gray-600">Orders list</span>
              </div>

              <div className="border-l-2 border-gray-300 pl-4 space-y-3 ml-6">
                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">id</span>
                  <span className="text-gray-600">Order ID</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">charge</span>
                  <span className="text-gray-600">Order charge</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">start_count</span>
                  <span className="text-gray-600">Start count of order</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">status</span>
                  <span className="text-gray-600">Order status. Same as request parameter "status"</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">remains</span>
                  <span className="text-gray-600">Remaining completions</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">currency</span>
                  <span className="text-gray-600">ISO 4217 currency code</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">service_id</span>
                  <span className="text-gray-600">ID of service which belongs to this order</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">user</span>
                  <span className="text-gray-600">User object</span>
                </div>

                <div className="border-l-2 border-gray-300 pl-4 space-y-3 ml-6">
                  <div className="flex items-start gap-4">
                    <span className="font-medium min-w-20">id</span>
                    <span className="text-gray-600">User ID on panel</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="font-medium min-w-20">login</span>
                    <span className="text-gray-600">User login on panel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Order Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Edit order</h2>
          <p className="text-gray-600">Use this method to edit the order status, the number of executions or the start count</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Request sample</h3>
            <div className="flex items-center gap-2">
              <Input
                value="https://socpanel.com/privateApi/editOrder?order_id={order_id}&status={status}&start_count={start_count}&completions={completions}&token={token}"
                readOnly
                className="text-sm border border-gray-700 text-gray-800"
              />
              <Button size="icon" variant="outline" className="border-gray-700">
                <Copy className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            <h3 className="text-lg font-semibold">parameters_title</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-blue-600 pl-4 space-y-3">
                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">order_id</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">Order ID (required)</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">status</span>
                  <span className="text-blue-600 text-sm">String</span>
                  <span className="text-gray-600">New order status (optional)</span>
                </div>

                <div className="border-l-2 border-gray-300 pl-4 space-y-2 ml-6">
                  <div className="text-gray-800 text-sm">active</div>
                  <div className="text-gray-800 text-sm">completed</div>
                  <div className="text-gray-800 text-sm">canceled</div>
                  <div className="text-gray-800 text-sm">partial</div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">start_count</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">New start count (optional)</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">completions</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">New completions count (optional)</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold">Response sample</h3>
            <Card className="bg-gray-100">
              <CardContent className="p-4">
                <pre className="text-sm">
{`{
  "ok": true
}`}
                </pre>
              </CardContent>
            </Card>

            <h3 className="text-lg font-semibold">The method returns an object containing the following fields:</h3>
            <div className="border-l-2 border-blue-600 pl-4">
              <div className="flex items-start gap-4">
                <span className="font-medium min-w-20">ok</span>
                <span className="text-blue-600 text-sm">Boolean</span>
                <span className="text-gray-600">Operation result</span>
              </div>
            </div>
          </div>
        </div>

        {/* Increment User Balance Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Increment user balance</h2>
          <p className="text-gray-600">Use this method to increment user's balance</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Request sample</h3>
            <div className="flex items-center gap-2">
              <Input
                value="https://socpanel.com/privateApi/incrementUserBalance?user_id={user_id}&amount={amount}"
                readOnly
                className="text-sm border border-gray-700 text-gray-800"
              />
              <Button size="icon" variant="outline" className="border-gray-700">
                <Copy className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            <h3 className="text-lg font-semibold">parameters_title</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-blue-600 pl-4 space-y-3">
                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">user_id</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">User ID (required without login)</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">login</span>
                  <span className="text-blue-600 text-sm">String</span>
                  <span className="text-gray-600">User login (required without user_id)</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">amount</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">Amount to add to user balance (required)</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold">Response sample</h3>
            <Card className="bg-gray-100">
              <CardContent className="p-4">
                <pre className="text-sm">
{`{
  "ok": true
}`}
                </pre>
              </CardContent>
            </Card>

            <h3 className="text-lg font-semibold">The method returns an object containing the following fields:</h3>
            <div className="border-l-2 border-blue-600 pl-4">
              <div className="flex items-start gap-4">
                <span className="font-medium min-w-20">ok</span>
                <span className="text-blue-600 text-sm">Boolean</span>
                <span className="text-gray-600">Operation result</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decrement User Balance Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Decrement user balance</h2>
          <p className="text-gray-600">Use this method to decrement user's balance</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Request sample</h3>
            <div className="flex items-center gap-2">
              <Input
                value="https://socpanel.com/privateApi/decrementUserBalance?user_id={user_id}&amount={amount}"
                readOnly
                className="text-sm border border-gray-700 text-gray-800"
              />
              <Button size="icon" variant="outline" className="border-gray-700">
                <Copy className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            <h3 className="text-lg font-semibold">parameters_title</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-blue-600 pl-4 space-y-3">
                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">user_id</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">User ID (required without login)</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">login</span>
                  <span className="text-blue-600 text-sm">String</span>
                  <span className="text-gray-600">User login (required without user_id)</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-medium min-w-20">amount</span>
                  <span className="text-blue-600 text-sm">Integer</span>
                  <span className="text-gray-600">Amount to decrement from user balance (optional)</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold">Response sample</h3>
            <Card className="bg-gray-100">
              <CardContent className="p-4">
                <pre className="text-sm">
{`{
  "ok": true
}`}
                </pre>
              </CardContent>
            </Card>

            <h3 className="text-lg font-semibold">The method returns an object containing the following fields:</h3>
            <div className="border-l-2 border-blue-600 pl-4">
              <div className="flex items-start gap-4">
                <span className="font-medium min-w-20">ok</span>
                <span className="text-blue-600 text-sm">Boolean</span>
                <span className="text-gray-600">Operation result</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}