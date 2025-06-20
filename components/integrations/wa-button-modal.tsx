"use client"

import { useForm } from "react-hook-form"
import { useModal } from "../modal/provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"

type FormData = {
  wa: string
}

export default function WaButtonModal({ siteId }: { siteId: string }) {
  const modal = useModal()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const sanitized = data.wa.replace(/^0+/, "") // hilangkan 0 di awal
      const fullNumber = `62${sanitized}`
      const response = await axios.post(`/api/integrations/whatsapp`, {
        whatsappNumber: fullNumber,
        siteId
      })
      if (response.status === 200) {
        toast.success("Whatsapp number updated successfully")
      }
      modal?.hide()
      reset()
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700"
    >
      {/* Form Header */}
      <div className="flex flex-col space-y-4 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          WhatsApp Button
        </h2>

        <div className="space-y-2">
          <Label htmlFor="wa" className="text-gray-700 dark:text-gray-300">
            Nomor WhatsApp
          </Label>
          <div className="flex items-center space-x-2">
            <span className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              +62
            </span>
            <Input
              id="wa"
              placeholder="81234567890"
              type="tel"
              inputMode="numeric"
              {...register("wa", {
                required: "Nomor WA wajib diisi",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Hanya boleh angka",
                },
                minLength: {
                  value: 9,
                  message: "Minimal 9 digit",
                },
              })}
              className="flex-1 text-gray-800"
            />
          </div>
          {errors.wa && (
            <p className="text-sm text-red-500">{errors.wa.message}</p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => {
            modal?.hide()
            reset()
          }}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-600 bg-gray-800 text-white dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          {
            isSubmitting ?
              <Loader2Icon className="animate-spin" /> :
              "Save"
          }
        </button>
      </div>
    </form>
  )
}
