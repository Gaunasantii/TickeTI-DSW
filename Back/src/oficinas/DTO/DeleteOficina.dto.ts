import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteOficinaDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 */

export const DeleteOficinaSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})