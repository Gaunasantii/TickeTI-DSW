import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginateOficinaDto:
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

export const PaginatedOficinasQuerySchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type PaginatedOficinaInDto=zod.infer<typeof PaginatedOficinasQuerySchema>['query']