"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import {NewEpisode} from "../interfaces"

const idsPattern = /^\d+(?:-\d+)*$/;

const schema = z.object({
  title: z
    .string()
    .min(6, "El título debe tener al menos 6 caracteres."),
  characters: z
    .string()
    .regex(
      idsPattern,
      "Formato inválido. Usa IDs numéricos separados por guiones, ej: 12-14-1-23-8."
    ),
});

type FormValues = z.infer<typeof schema>;

export default function Form({ addEpisode }: {addEpisode :(episode : NewEpisode) => void}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      characters: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const ids = data.characters
      .split("-")
      .filter(Boolean)
      .map((n) => Number(n));

    const newEpisode : NewEpisode = {
      name: data.title.trim(),
      character_ids: ids,
      createdAt: new Date(),
    }
    addEpisode(newEpisode);

    toast("Nuevo episodio añadido")

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Título</label>
        <input
          type="text"
          className="border rounded px-3 py-2 outline-none"
          placeholder="Título del episodio"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm">Personajes (IDs con -)</label>
        <input
          type="text"
          className="border rounded px-3 py-2 outline-none"
          placeholder="Ej: 12-14-1-23-8"
          {...register("characters")}
        />
        {errors.characters && (
          <p className="text-red-600 text-sm">{errors.characters.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Usa solo números y guiones. Ejemplo válido: 10-2-35-12-15
        </p>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!isValid || isSubmitting}
      >
        Guardar
      </button>
    </form>
  );
}
