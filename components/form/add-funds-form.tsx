"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Loader2Icon } from "lucide-react"
import axios from "axios"

// Validasi schema pakai zod
const addFundsSchema = z.object({
    amount: z
        .number({ invalid_type_error: "Amount must be a number" })
        .min(10000, { message: "Minimum top-up is Rp 10,000" }),
})

// Tipe input form
type AddFundsFormValues = z.infer<typeof addFundsSchema>

export default function AddFundsForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<AddFundsFormValues>({
        resolver: zodResolver(addFundsSchema),
        defaultValues: {
            amount: 0,
        },
    })

    const onSubmit = async (data: AddFundsFormValues) => {
        try {
            const response = await axios.post(`/api/top-up/user`, { ammount: data.amount })
            if (response.status === 200) {
                window.open(response.data.response.redirect_url, "_blank")
                toast.success("Success add funds")
                reset()
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    }

    return (
        <Card className="max-w-lg mx-auto shadow-xl rounded-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Funds</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="amount">Amount (Rp)</Label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            {...register("amount", { valueAsNumber: true })}
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Add Funds"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
