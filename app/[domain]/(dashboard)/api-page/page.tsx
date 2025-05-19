'use client';

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

export default function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin API</h1>

      <Card>
        <CardHeader className="font-semibold">Admin API Endpoint</CardHeader>
        <CardContent className="flex items-center justify-between">
          <span>https://socpanel.com/privateApi</span>
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="font-semibold">Your Token</CardHeader>
        <CardContent className="flex items-center gap-4">
          <Input value="••••••••••" readOnly className="w-full" />
          <Button onClick={() => {

          }} variant="secondary">Change Token</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Get Orders</h2>
        <p className="mb-2 text-muted-foreground">Use this method to get orders</p>

        <Card>
          <CardHeader className="font-semibold">Request Sample</CardHeader>
          <CardContent>
            <code className="block whitespace-pre-wrap break-all p-4 bg-gray-100 rounded-md text-sm">
              https://socpanel.com/privateApi/getOrders?status=&#123;status&#125;&order_ids=&#123;order_ids&#125;&limit=&#123;limit&#125;&offset=&#123;offset&#125;&service_id=&#123;service_id&#125;&token=&#123;token&#125;
            </code>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="font-semibold">Parameters</CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium">status <span className="text-sm text-muted-foreground">(String)</span></h3>
            <p className="mb-4 text-muted-foreground">Filter by order status. One of:</p>
            <ul className="list-disc list-inside space-y-1">
              {[
                "active",
                "queued",
                "completed",
                "canceled",
                "partial",
                "fail",
                "resending",
                "canceling",
                "moderation"
              ].map((status) => (
                <li key={status} className="font-mono text-sm">{status}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
