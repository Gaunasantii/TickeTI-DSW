import zod from 'zod'

export const DeleteTicketSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})