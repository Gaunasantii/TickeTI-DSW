import zod from 'zod'
import { id } from 'zod/locales'

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangePriorityDto:
 *       type: object
 *       required:
 *         - prioridad
 *       properties:
 *         prioridad:
 *           type: number
 *           minimum: 1
 *           example: 1
 */

export const ChangePrioritySchema=zod.object({
    body:zod.object({
        prioridad:zod.number().min(1)
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/,"El id debe ser numerico")
    })
})

export type ChangePriorityInBodyDto=zod.infer<typeof ChangePrioritySchema>['body']