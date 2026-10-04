import zod from 'zod'

export const PaginatedOficinasQuerySchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type PaginatedOficinaInDto=zod.infer<typeof PaginatedOficinasQuerySchema>['query']