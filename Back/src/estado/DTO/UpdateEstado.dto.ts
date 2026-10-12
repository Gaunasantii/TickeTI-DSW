import zod from "zod";

export const UpdateEstadoSchema = zod.object({
    body: zod.object({
      nombre: zod.string().optional(),
      descripcion: zod.string().optional(),
    }),
    params: zod.object({
      id: zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
    })
});

export type UpdateEstadoDTOType = zod.infer<typeof UpdateEstadoSchema>["body"];