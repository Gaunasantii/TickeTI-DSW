import zod from 'zod'

export const ResolveTicketSchema=zod.object({
    body:zod.object({
        solucion:zod.string().min(1,{message:"La solucion no puede estar vacia"})
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/, { message: "El id debe ser un número" })
    })
})

export type ResolveTicketInBodyDto=zod.infer<typeof ResolveTicketSchema>["body"]