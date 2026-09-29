import zod from 'zod'

export const CreatePrioridadSchema=zod.object({
    body:zod.object({
        nombre:zod.string(),
        tiempoLimiteResolucion:zod.number().min(1)
    })
})

export type CreatePrioridadInDto=zod.infer<typeof CreatePrioridadSchema>["body"]