"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z
    .preprocess((a) => (a === "" ? undefined : Number(a)), z.number().positive().optional()),
  maxPrice: z
    .preprocess((a) => (a === "" ? undefined : Number(a)), z.number().positive().optional()),
});

type FilterFormData = z.infer<typeof filterSchema>;

export default function FilterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
  });
  const router = useRouter();

  const onSubmit = (data: FilterFormData) => {
    const query = new URLSearchParams();
    if (data.category) query.append("category", data.category);
    if (data.minPrice !== undefined) query.append("minPrice", data.minPrice.toString());
    if (data.maxPrice !== undefined) query.append("maxPrice", data.maxPrice.toString());
    router.push(`/products/filters?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("category")} placeholder="Категория" />
      {errors.category && <p>{errors.category.message}</p>}
      <input type="number" {...register("minPrice")} placeholder="Мин. цена" />
      {errors.minPrice && <p>{errors.minPrice.message}</p>}
      <input type="number" {...register("maxPrice")} placeholder="Макс. цена" />
      {errors.maxPrice && <p>{errors.maxPrice.message}</p>}
      <button type="submit">Фильтровать</button>
    </form>
  );
}
