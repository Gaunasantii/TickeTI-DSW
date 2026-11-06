import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginatedUserDto:
 *       type: object
 *       required:
 *         - page
 *         - cantPerPage
 *       properties:
 *         page:
 *           type: string
 *           example: "1"
 *         cantPerPage:
 *           type: string
 *           example: "10"
 */

export const PaginatedUserSchema=zod.object({
    query:zod.object({
        page:zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type PaginatedUserInDto=zod.infer<typeof PaginatedUserSchema>["query"]