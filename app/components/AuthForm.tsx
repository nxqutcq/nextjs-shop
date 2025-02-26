"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface AuthFormInputs {
  email: string;
  password: string;
}

interface AuthFormProps {
  onSubmit: SubmitHandler<AuthFormInputs>;
  buttonText: string;
}

export default function AuthForm({ onSubmit, buttonText }: AuthFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="email" 
        placeholder="Email" 
        {...register("email", { required: "Email обязателен" })} 
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input 
        type="password" 
        placeholder="Пароль" 
        {...register("password", { required: "Пароль обязателен" })} 
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">{buttonText}</button>
    </form>
  );
}
