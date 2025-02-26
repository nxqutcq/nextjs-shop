'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/app/components/shared/Input'
import { EmailIcon } from '@/app/components/shared/icons/EmailIcon'
import { EyeIcon } from '@/app/components/shared/icons/EyeIcon'

const loginSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(6, { message: 'Минимум 6 символов' }),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: LoginFormData) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    if (res?.error) setErrorMsg('Ошибка авторизации')
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="min-h-dvh items-center flex justify-start flex-col">
      <h1 className="mt-[2rem]">Вход в систему</h1>
      <form
        className="flex mt-[2rem] text-sm w-full bg-white/10 border border-white/10 max-w-[400px] p-5 rounded-xl flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <Input
            rightIcon={<EmailIcon />}
            type="email"
            placeholder="Email"
            {...register('email')}
          />

          {errors.email && <p>{errors.email.message}</p>}

          <Input
            rightIcon={
              <EyeIcon
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
            }
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            {...register('password')}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="flex justify-start mb-[1rem] ml-[0.2rem] mt-[2rem] text-xs items-center">
          Ещё нет аккаунта?
          <Link
            className="p-1 text-blue-500 hover:text-blue-600 duration-200"
            href="/register"
          >
            Зарегистрируйтесь
          </Link>
        </div>
        <button
          className="p-3 bg-white/20 rounded hover:bg-white/25 duration-300"
          type="submit"
        >
          Войти
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  )
}
