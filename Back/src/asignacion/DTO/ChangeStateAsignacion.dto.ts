import zod from 'zod'

export const ChangeStateAsignacionSchema=zod.object({
    body:zod.object({
        estado:zod.boolean(),
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type ChangeStateAsignacionBodyDTO = zod.infer<typeof ChangeStateAsignacionSchema>["body"];


export type ChangeStateAsignacionParamsDTO = zod.infer<typeof ChangeStateAsignacionSchema>["params"];