import zod from 'zod'

export const CreateAsignacionSchema=zod.object({
    body:zod.object({
        ticket: zod.number().min(1),
        tecnico: zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
    })
})

export type CreateAsignacionInDto=zod.infer<typeof CreateAsignacionSchema>["body"]