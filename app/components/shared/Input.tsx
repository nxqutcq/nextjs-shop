import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  register?: UseFormRegisterReturn
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  rightIcon,
  className = '',
  ...props
}) => {
  return (
    <div className="relative">
      {label && <label className="block text-xs mb-1">{label}</label>}
      <input
        {...(register ? register : {})}
        {...props}
        className={`p-2 w-full border bg-transparent rounded-md pr-10 ${className}`}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {rightIcon}
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  )
}
