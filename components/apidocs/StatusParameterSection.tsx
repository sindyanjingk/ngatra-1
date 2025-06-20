import { Badge } from "@/components/ui/badge"

export default function StatusParameterSection() {
    const statuses = [
        "active",
        "queued",
        "completed",
        "canceled",
        "partial",
        "fail",
        "resending",
        "canceling",
        "moderation",
    ]

    return (
        <div className="space-y-4 mt-10">
            <h3 className="text-lg font-semibold ">parameters_title</h3>

            <div className="border-l-2 border-blue-600 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                    <span className=" font-medium">status</span>
                    <Badge variant="secondary" className=" text-xs">
                        String
                    </Badge>
                    <span className="text-gray-400 text-sm">
                        Filter by order status. One of:
                    </span>
                </div>

                <div className="border-l-[1px] border-gray-600 pl-4 space-y-2">
                    {statuses.map((status) => (
                        <div key={status} className="text-gray-800 text-sm border-b pb-4 border-gray-700 py-1">
                            {status}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className=" font-medium">status</span>
                </div>
            </div>
        </div>
    )
}
