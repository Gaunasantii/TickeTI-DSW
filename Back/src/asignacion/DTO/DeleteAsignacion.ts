import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteAsignacionDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 */

export const FindOneAsignacionSchema=zod.object({
    params:zod.object({
            id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
        })
})