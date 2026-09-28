import zod from 'zod'

export const OficinaOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  empresa:zod.number()
})

export type OficinaDto=zod.infer<typeof OficinaOutSchema>