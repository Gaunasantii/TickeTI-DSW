import zod from 'zod'

export const CreateEstadoSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty(),
        descripcion:zod.string().nonempty().max(200)
    })
})

export type CreateEstadoInDto=zod.infer<typeof CreateEstadoSchema>["body"]