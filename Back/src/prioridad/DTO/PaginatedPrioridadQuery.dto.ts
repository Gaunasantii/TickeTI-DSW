import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginatedPrioridadQueryDto:
 *       type: object
 *       required:
 *         - page
 *         - cantPerPage
 *       properties:
 *         page:
 *           type: integer
 *           description: El número de página
 *           example: 1
 *         cantPerPage:
 *           type: integer
 *           description: La cantidad de elementos por página
 *           example: 10
 */

export const PaginatedPrioridadQuerySchema = zod.object({
    query:zod.object({
            page:zod.string().regex(/^\d+$/, "El número de página debe ser numérico"),
            cantPerPage:zod.string().regex(/^\d+$/, "La cantidad por página debe ser numérica")
        })
}) 

export type PaginatedPrioridadQueryDtoType = zod.infer<typeof PaginatedPrioridadQuerySchema>["query"];