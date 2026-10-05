import zod from 'zod'

export const PaginatedEmpresaQuerySchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El Dato debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El Dato debe ser numérico")
    })
})

export type PaginatedEmpresaInDto=zod.infer<typeof PaginatedEmpresaQuerySchema>['query']