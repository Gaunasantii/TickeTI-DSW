import zod from'zod'


export const CategoriaOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string()
})

export type CategoriaDto=zod.infer<typeof CategoriaOutSchema>