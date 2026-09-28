import zod from 'zod'

export const FindOneEstadoSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type FindOneEstadoInDto=zod.infer<typeof FindOneEstadoSchema>["params"]