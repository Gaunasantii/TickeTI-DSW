import zod from 'zod'

export const ModifyPrioridadSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    }),
    body:zod.object({
        nombre:zod.string().nonempty(),
        tiempoLimiteResolucion:zod.number().min(1)
    })
})

export type ModifyPrioridadInBodyDto=zod.infer<typeof ModifyPrioridadSchema>["body"]
export type ModifyPrioridadInParamsDto=zod.infer<typeof ModifyPrioridadSchema>["params"]