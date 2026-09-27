import zod from 'zod'

export const ModifyCategoriaSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    }),
    body:zod.object({
        nombre:zod.string().nonempty()
    })
})

export type ModifyCategoriaInParamsDto=zod.infer<typeof ModifyCategoriaSchema>["params"]
export type ModifyCategoriaInBodyDto=zod.infer<typeof ModifyCategoriaSchema>["body"]