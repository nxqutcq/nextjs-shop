'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { Input } from '@/app/components/shared/Input'
import { EmailIcon } from '@/app/components/shared/icons/EmailIcon'

const registerSchema = z
  .object({
    email: z.string().email({ message: 'Некорректный email' }),
    password: z.string().min(6, { message: 'Минимум 6 символов' }),
    confirmPassword: z.string().min(6, { message: 'Минимум 6 символов' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Регистрация прошла успешно', data)
    } catch {
      setErrorMsg('Ошибка регистрации')
    }
  }

  return (
    <div className="min-h-dvh items-center flex justify-start flex-col">
      <h1 className="mt-[2rem]">Регистрация</h1>
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
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Input
            type="password"
            placeholder="Подтвердите пароль"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <button
            className="p-3 bg-white/20 rounded hover:bg-white/25 duration-300"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  )
}
