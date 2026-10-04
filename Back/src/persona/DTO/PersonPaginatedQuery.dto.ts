import zod from 'zod'

export const PaginatedPersonSchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El número de página debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "La cantidad por página debe ser numérica")
    })
})

export type PaginatedPersonInDto=zod.infer<typeof PaginatedPersonSchema>["query"]