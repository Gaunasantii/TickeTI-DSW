import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteTecnicoDto:
 *       type: object
 *       required:
 *         - dni
 *       properties:
 *         dni:
 *           type: string
 *           example: "40123456"
 */

export const DeleteTecnicoSchema=zod.object({
    params:zod.object({
            dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
        })
})