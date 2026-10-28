import zod from 'zod'


/**
 * @openapi
 * components:
 *   schemas:
 *     LoginOut:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         dni:
 *           type: string
 *         type:
 *           type: string
 */

export const LoginOutSchema=zod.object({
    name:zod.string(),
    dni:zod.string(),
    type:zod.string()
})

export type LoginDto=zod.infer<typeof LoginOutSchema>