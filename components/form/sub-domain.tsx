"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

type FormValues = {
    subdomain: string;
    currency: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

const SubDomain = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            subdomain: "",
            currency: "IDR",
            username: "",
            password: "",
            confirmPassword: "",
            email: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(`/api/create-sub-domain`, data);
            console.log({ response });
            if (response.status === 200) {
                toast.success("Success create subdomain");
                window.location.replace("/");
            }
        } catch (error:any) {
            console.log({ error });
            toast.error(error?.response?.data?.error  || "Something went wrong");
        }
    };

    return (
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="subdomain" className="text-gray-700 text-md">Panel Domain <span className='text-red-500'>*</span></Label>
            <div className="flex items-center flex-col space-x-2">
                <div className="relative flex flex-1 w-full">
                    <Input
                        placeholder="findyourdomain"
                        {...register("subdomain", { required: "Subdomain is required" })}
                        className="rounded-full text-gray-900 border bg-gray-100 px-4 pr-20 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className={cn(
                        "absolute inset-y-0 right-0 flex items-center px-3 border rounded-r-full bg-gray-100 border-l border-gray-300 text-black font-semibold"
                    )}>
                        {`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                    </div>
                </div>
                {errors.subdomain && <p className="text-red-500 text-sm">{errors.subdomain.message}</p>}
            </div>

            <div className='space-y-3'>
                <Label className="block text-sm font-medium text-gray-700">
                    Panel Currency <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("currency", value)}>
                    <SelectTrigger className="text-gray-800 rounded-full bg-gray-100 p-4 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="IDR">IDR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='space-y-3'>
                <Label className="block text-sm font-medium text-gray-700">
                    Admin email <span className="text-red-500">*</span>
                </Label>
                <Input {...register("email", { required: "email is required" })} placeholder='Enter email' className="rounded-full text-gray-900 bg-gray-100 p-4 focus:ring-2 focus:ring-blue-500" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className='space-y-3'>
                <Label className="block text-sm font-medium text-gray-700">
                    Admin Username <span className="text-red-500">*</span>
                </Label>
                <Input {...register("username", { required: "Username is required" })} placeholder='Enter username' className="rounded-full text-gray-900 bg-gray-100 p-4 focus:ring-2 focus:ring-blue-500" />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className='space-y-3'>
                <Label className="block text-sm font-medium text-gray-700">
                    Admin Password <span className="text-red-500">*</span>
                </Label>
                <Input type="password" {...register("password", { required: "Password is required" })} placeholder='Enter password' className="rounded-full text-gray-900 bg-gray-100 p-4 focus:ring-2 focus:ring-blue-500" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className='space-y-3'>
                <Label className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input type="password" {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Passwords do not match"
                })} placeholder='Confirm password' className="rounded-full text-gray-900 bg-gray-100 p-4 focus:ring-2 focus:ring-blue-500" />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <Button className="rounded-full bg-gradient-to-r from-purple-700 via-blue-500 to-blue-500 p-4 text-white" type='submit'>
                {
                    isSubmitting ?
                    <Loader2Icon className='animate-spin'/> :
                    "Submit"
                }
            </Button>
        </form>
    )
}

export default SubDomain;
