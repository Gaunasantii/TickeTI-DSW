import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteTicketDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 */

export const DeleteTicketSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})