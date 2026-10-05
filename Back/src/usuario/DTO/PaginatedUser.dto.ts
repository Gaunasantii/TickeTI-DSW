import zod from 'zod'

export const PaginatedUserSchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type PaginatedUserInDto=zod.infer<typeof PaginatedUserSchema>["query"]