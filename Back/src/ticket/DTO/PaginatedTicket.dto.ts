import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginatedTicketDto:
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
 *         estadoId:
 *           type: integer
 *           example: 1
 *         categoriaId:
 *           type: integer
 *           example: 2
 *         prioridadId:
 *           type: integer
 *           example: 3
 */

export const PaginatedTicket=zod.object({
    query:zod.object({
        estado:zod.string().regex(/^\d+$/, "El ID debe ser numérico").optional(),
        categoria:zod.string().regex(/^\d+$/, "El ID debe ser numérico").optional(),
        page:zod.string().regex(/^\d+$/, "El ID debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type ticketQueryParamsDto=zod.infer<typeof PaginatedTicket>["query"]