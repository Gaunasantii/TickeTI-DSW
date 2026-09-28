import zod from 'zod'

export const EmpresaOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string()
})

export type EmpresaDto=zod.infer<typeof EmpresaOutSchema>