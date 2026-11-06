import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteUsuarioDto:
 *       type: object
 *       required:
 *         - dni
 *       properties:
 *         dni:
 *           type: string
 *           example: "47107024"
 */

export const DeleteUsuarioSchema=zod.object({
    params:zod.object({
            dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
        })
})