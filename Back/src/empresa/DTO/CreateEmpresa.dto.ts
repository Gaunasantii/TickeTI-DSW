import zod from 'zod'

export const CreateEmpresaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty()
    })
})

export type CreateEmpresaInDto=zod.infer<typeof CreateEmpresaSchema>["body"]