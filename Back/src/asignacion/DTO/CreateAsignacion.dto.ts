import zod from 'zod'

export const CreateAsignacionSchema=zod.object({
    body:zod.object({
        fechaCreacion: zod.date(),
        ticketId: zod.number().min(1),
        tecnicoDni: zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
    })
})

export type CreateAsignacionInDto=zod.infer<typeof CreateAsignacionSchema>["body"]