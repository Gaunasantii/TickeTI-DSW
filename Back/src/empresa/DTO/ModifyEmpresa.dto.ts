import zod from 'zod'

export const ModifyEmpresaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty()
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type ModifyEmpresaSchemaInParamsDto=zod.infer<typeof ModifyEmpresaSchema>["params"]
export type ModifyEmpresaSchemaInBodyDto=zod.infer<typeof ModifyEmpresaSchema>["body"]