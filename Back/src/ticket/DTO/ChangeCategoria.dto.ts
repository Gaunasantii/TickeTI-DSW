import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangeCategoriaDto:
 *       type: object
 *       required:
 *         - categoria
 *       properties:
 *         categoria:
 *           type: number
 *           minimum: 1
 *           example: 2
 */

export const ChangeCategoriaSchema=zod.object({
    body:zod.object({
        categoria:zod.number().min(1)
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/,"El id debe ser numerico")
    })
})

export type ChangeCategoriaInBodyDto=zod.infer<typeof ChangeCategoriaSchema>['body']