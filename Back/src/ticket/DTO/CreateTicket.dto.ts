import zod from 'zod'

export const CreateTicketSchema=zod.object({
    body:zod.object({
        title:zod.string(),
        description:zod.string(),
        estado:zod.number().min(1),
        prioridad:zod.number().min(1),
        categoria:zod.number().min(1),
    })
})

export type CreateTicketInDto=zod.infer<typeof CreateTicketSchema>['body']