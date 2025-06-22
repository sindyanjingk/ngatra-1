'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Loader2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
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
    },
  })

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const response = await axios.post('/api/user-site-register', {
            username: data.username,
            email: data.email,
            password: data.password,
            siteId,
          })
          toast.success(response.data.message)
          router.push(`login`)
        } catch (error: any) {
          console.log({ error })
          toast.error(error.response?.data?.error || 'Gagal daftar')
        }
      })}
      className="text-gray-800 bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 md:w-1/3 w-full flex items-center justify-center flex-col gap-6"
    >
      <div className="flex flex-col gap-y-2 w-full">
        <label htmlFor="username">Username</label>
        <Input
          {...register('username', {
            required: 'Username wajib diisi',
            minLength: {
              value: 3,
              message: 'Minimal 3 karakter',
            },
          })}
          type="text"
          placeholder="input your username"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message as string}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-2 w-full">
        <label htmlFor="email">Email</label>
        <Input
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Format email tidak valid',
            },
          })}
          type="email"
          placeholder="input your email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message as string}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-2 w-full relative">
        <label htmlFor="password">Password</label>
        <Input
          {...register('password', {
            required: 'Password wajib diisi',
            minLength: {
              value: 6,
              message: 'Minimal 6 karakter',
            },
          })}
          type={showPassword ? 'text' : 'password'}
          placeholder="input your password"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-10 text-gray-500"
        >
          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message as string}</span>
        )}
      </div>

      <Button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-blue-500 w-full"
      >
        {isSubmitting ? <Loader2Icon className="animate-spin" /> : 'Daftar'}
      </Button>

      <div className="text-sm">
        Sudah punya akun?{' '}
        <Link href="login">
          <span className="font-bold underline cursor-pointer">Masuk</span>
        </Link>
      </div>
    </form>
  )
}

export default RegisterUserSiteForm
