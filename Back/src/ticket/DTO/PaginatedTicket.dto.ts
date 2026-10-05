import zod from 'zod'

export const PaginatedTicket=zod.object({
    query:zod.object({
        estado:zod.string().regex(/^\d+$/, "El ID debe ser numérico").optional(),
        categoria:zod.string().regex(/^\d+$/, "El ID debe ser numérico").optional(),
        page:zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type ticketQueryParamsDto=zod.infer<typeof PaginatedTicket>["query"]