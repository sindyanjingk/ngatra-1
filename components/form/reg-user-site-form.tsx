"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const RegisterUserSiteForm = ({ siteId }: { siteId: string }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })
    const router = useRouter()

    return (
        <form onSubmit={handleSubmit(async data => {
            console.log({data});
            try {
                if (errors.username || errors.email || errors.password) {
                    console.log({ errors });
                }
                const response = await axios.post('/api/user-site-register', {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    siteId,
                })
                toast.success(response.data.message)
                router.push(`login`)
            } catch (error:any) {
                console.log({ error });
                toast.error(error.response.data.error)
            }
        })} className='text-gray-800 bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 md:w-1/3  w-full flex items-center justify-center flex-col gap-6'>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password">Username</label>
                <Input {...register("username")} required type='text' name='username' placeholder='input your username' />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password">Email</label>
                <Input {...register("email")} required type='text' name='email' placeholder='innput your email' />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password">Password</label>
                <Input {...register("password")} required type='password' name='password' placeholder='input your password' />
            </div>
            <Button type='submit' className='bg-gradient-to-r from-purple-500 to-blue-500'>{isSubmitting ? <Loader2Icon className='animate-spin'/> : "Daftar"}</Button>
            <div className="text-sm">Sudah punya akun? <Link href={"login"}><span className='font-bold underline cursor-pointer'>Masuk</span></Link></div>
        </form>
    )
}

export default RegisterUserSiteForm