import zod from 'zod'

export const PrioridadOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  tiempoLimiteResolucion:zod.number()
})

export type PrioridadDto=zod.infer<typeof PrioridadOutSchema>