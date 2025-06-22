'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type Props = {
  siteId: string
}

const LoginUserSiteForm = ({ siteId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const response = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        })
        if (response?.ok) {
          router.push('dashboard')
        }
      })}
      className="text-gray-800 bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 md:w-1/3 w-full flex items-center justify-center flex-col gap-6"
    >
      <div className="flex flex-col gap-y-2 w-full">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          placeholder="input your email"
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Format email tidak valid',
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message as string}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-2 w-full relative">
        <label htmlFor="password">Password</label>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="input your password"
          {...register('password', {
            required: 'Password wajib diisi',
          })}
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

      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 w-full">
        {isSubmitting ? <Loader2Icon className="animate-spin" /> : 'Masuk'}
      </Button>

      <div className="text-sm">
        Belum punya akun?{' '}
        <Link href="reg">
          <span className="font-bold underline cursor-pointer">Daftar</span>
        </Link>
      </div>
    </form>
  )
}

export default LoginUserSiteForm
