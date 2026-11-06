import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PersonPaginatedQueryDto:
 *       type: object
 *       required:
 *         - page
 *         - cantPerPage
 *       properties:
 *         page:
 *           type: string
 *           description: Número de página
 *           example: "1"
 *         cantPerPage:
 *           type: string
 *           description: Cantidad de personas por página
 *           example: "10"
 */

export const PaginatedPersonSchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El número de página debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "La cantidad por página debe ser numérica")
    })
})

export type PaginatedPersonInDto=zod.infer<typeof PaginatedPersonSchema>["query"]