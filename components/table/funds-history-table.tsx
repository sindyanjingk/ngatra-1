"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIDR } from "@/lib/helpers"
import moment from "moment"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types"


type Props = {
    data: Transaction[]
    title?:string
}

export default function FundsHistoryTable({ data, title = "Funds History" }: Props) {
    return (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{formatIDR(item.totalAmount || 0)}</TableCell>
                                <TableCell>
                                    <Badge
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{moment(item.createdAt).format("DD MMM YYYY, HH:mm")}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                                No transaction history.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
