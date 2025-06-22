'use client';

import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRightCircleIcon, EllipsisIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Prisma } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import ButtonStatusOrder from "../order/button-status-order";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";

export type TTransaction = Prisma.transactionGetPayload<{
  include: {
    user: true,
    siteService: {
      include: {
        provider: true
      }
    },
    sites: true;
  };
}>;

export default function OrderTableUser({ transactions }: { transactions: TTransaction[] }) {
  const OrderItem = dynamic(() => import("../order/order-item-user"), { ssr: false })
  const [selectedOrders, setSelectedOrders] = useState<TTransaction[]>([]);
  const isAllSelected = selectedOrders.length === transactions.length;

  const searchParams = useSearchParams()
  const statusState = searchParams.get("status")


  const toggleSelectAll = (checked: boolean) => {
    setSelectedOrders(checked ? transactions : []);
  };

  const toggleSelectSingle = (order: TTransaction, checked: string | boolean) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, order] : prev.filter((o) => o.id !== order.id)
    );
  };

  const status = [
    "All",
    "Processing",
    "Completed",
    "Failed",
    "In progress",
    "Partial",
    "Canceled",
    "Pending",
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <div className="flex items-center gap-x-4 mb-4">
        {status.map((item, index) => (
          <ButtonStatusOrder statusState={statusState} key={index} status={item} />
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} />
            </TableHead>
            {selectedOrders.length !== 0 ? (
              <TableHead className="flex items-center gap-x-4">
                <div className="text-green-500 font-bold">{selectedOrders.length}</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <EllipsisIcon className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="md:w-56">
                    <Button onClick={() => {
                      toast.success("Your request is being processed")
                    }} variant={"ghost"}>
                      <ArrowRightCircleIcon />
                      Resend To Provider
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableHead>
            ) : (
              <>
                <TableHead>Order</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((order: any, index: number) => {
            const isSelected = selectedOrders.some((o) => o.id === order.id);
            return (
              <OrderItem key={index} isSelected={isSelected} order={order} selectedOrders={selectedOrders} toggleSelectSingle={toggleSelectSingle} />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
