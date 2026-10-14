import zod from 'zod'

export const EstadoOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  descripcion:zod.string(),
  esEstadoInicial:zod.boolean(),
  esEstadoFinal:zod.boolean(),
  esEstadoBase:zod.boolean()
})

export type EstadoDto=zod.infer<typeof EstadoOutSchema>