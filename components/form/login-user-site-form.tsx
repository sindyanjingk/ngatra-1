"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type Props = {
    siteId : string
}

const LoginUserSiteForm = ({siteId}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const router = useRouter()
    return (
        <form onSubmit={handleSubmit(async(data)=>{
            const response = await signIn("credentials", {
                redirect : false,
                email : data.email,
                password : data.password,
            })
            if(response?.ok){
                router.push(`dashboard`)
            }
            console.log({response});
        })} className='text-gray-800 bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 md:w-1/3  w-full flex items-center justify-center flex-col gap-6'>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email">Email</label>
                <Input {...register("email")} type='text' name='email' placeholder='input your email' />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="passowrd">Password</label>
                <Input {...register("password")} type='password' name='password' placeholder='input your password' />
            </div>
            <Button className='bg-gradient-to-r from-purple-500 to-blue-500'>{isSubmitting ? <Loader2Icon className='animate-spin' /> : "Masuk"}</Button>
            <div className="text-sm">Belum punya akun? <Link href={"reg"}><span className='font-bold underline cursor-pointer'>Daftar</span></Link></div>
        </form>
    )
}

export default LoginUserSiteForm