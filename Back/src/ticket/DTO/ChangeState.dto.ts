import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangeStateDto:
 *       type: object
 *       required:
 *         - estado
 *       properties:
 *         estado:
 *           type: number
 *           minimum: 1
 *           example: 3
 */

export const ChangeStateSchema=zod.object({
    body:zod.object({
        estado:zod.number().min(1)
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/,"El id debe ser numerico")
    })
})

export type ChangeStateInBodyDto=zod.infer<typeof ChangeStateSchema>['body']