import zod from 'zod'

export const createUsuarioSchema=zod.object({
  body:zod.object({
    dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
    surName:zod.string().max(64),
    name:zod.string().max(64),
    tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    pass:zod.string().min(6),
  })
})

export type CreateUsuarioInDto=zod.infer<typeof createUsuarioSchema>["body"]