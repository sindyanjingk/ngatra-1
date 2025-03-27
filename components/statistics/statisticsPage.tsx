"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DateRangePicker } from "../ui/date-range-picker";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { formatIDR } from "@/lib/helpers";

export default function StatisticsPage({
  orders,
}: {
  orders: Prisma.transactionGetPayload<{
    include: {
      user: true;
      sites: true;
      siteService: true;
    };
  }>[];
}) {
  const [tab, setTab] = useState("days");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);

  // **Set Default Rentang Tanggal Jika "Days" (7 Hari Terakhir)**
  const defaultFrom = moment().subtract(6, "days").startOf("day").toDate();
  const defaultTo = moment().endOf("day").toDate();

  const selectedFrom = dateRange?.from || (tab === "days" ? defaultFrom : null);
  const selectedTo = dateRange?.to || (tab === "days" ? defaultTo : null);

  // Filter orders berdasarkan rentang tanggal
  const filteredOrders = selectedFrom && selectedTo
    ? orders.filter((item) => {
      const createdAt = new Date(item.createdAt!);
      return createdAt >= selectedFrom && createdAt <= selectedTo;
    })
    : orders;

  // Data yang digunakan untuk chart
  const dataOrders = filteredOrders.map((item) => ({
    name: moment(item.createdAt).format("DD MMM YYYY HH:mm"),
    value: item.totalAmount || 0, // Pastikan angka, bukan string
  }));

  const dataPayment = filteredOrders
    .filter((item) => item.status === "Completed")
    .map((item) => ({
      name: moment(item.createdAt).format("DD MMM YYYY HH:mm"),
      value: item.totalAmount || 0,
    }));

  const dataProfit = filteredOrders
    .filter((item) => item.status === "Completed")
    .map((item) => ({
      name: moment(item.createdAt).format("DD MMM YYYY HH:mm"),
      value: item.profit || 0,
    }));

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Tabs value={tab} onValueChange={setTab} className="space-y-2">
          <TabsList>
            <TabsTrigger value="days">Days</TabsTrigger>
            <TabsTrigger value="months">Months</TabsTrigger>
          </TabsList>
        </Tabs>
        <DateRangePicker />
      </div>

      {/* Cards with Charts */}
      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="Orders" data={dataOrders} color="#22c55e" />
        <ChartCard title="Payments" data={dataPayment} color="#f43f5e" />
        <ChartCard title="Profit" data={dataProfit} color="#3b82f6" />
      </div>
    </div>
  );
}

// Komponen reusable untuk chart
function ChartCard({
  title,
  data,
  color,
}: {
  title: string;
  data: { name: string; value: number }[];
  color: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => formatIDR(value as number)} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatIDR(value as number)} />
            <Area type="monotone" dataKey="value" stroke={color} fill={`${color}33`} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
