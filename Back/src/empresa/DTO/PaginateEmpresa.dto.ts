import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginateEmpresaDto:
 *       type: object
 *       required:
 *         - page
 *         - cantPerPage
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         cantPerPage:
 *           type: integer
 *           example: 10
 */

export const PaginatedEmpresaQuerySchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El Dato debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El Dato debe ser numérico")
    })
})

export type PaginatedEmpresaInDto=zod.infer<typeof PaginatedEmpresaQuerySchema>['query']