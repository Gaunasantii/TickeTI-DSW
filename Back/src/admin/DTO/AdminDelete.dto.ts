import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     AdminDeleteDto:
 *       type: object
 *       required:
 *         - dni
 *       properties:
 *         dni:
 *           type: string
 *           example: "35123456"
 */

export const DeleteAdminSchema=zod.object({
    params:zod.object({
            dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
        })
})