import zod from 'zod'

export const EstadoOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  descripcion:zod.string()
})

export type EstadoDto=zod.infer<typeof EstadoOutSchema>