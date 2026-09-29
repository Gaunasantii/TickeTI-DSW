import zod from 'zod'

export const CreateCategoriaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty()
    })
})

export type CreateCategoriaInDto=zod.infer<typeof CreateCategoriaSchema>["body"]