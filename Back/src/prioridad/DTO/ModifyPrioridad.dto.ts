import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyPrioridadDto:
 *       type: object
 *       required:
 *         - nombre
 *         - tiempoLimiteResolucion
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 1
 *           description: El nuevo nombre de la prioridad
 *           example: Alta
 *         tiempoLimiteResolucion:
 *           type: number
 *           minimum: 1
 *           description: El nuevo tiempo límite de resolución en horas
 *           example: 24
 */

export const ModifyPrioridadSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    }),
    body:zod.object({
        nombre:zod.string().nonempty(),
        tiempoLimiteResolucion:zod.number().min(1)
    })
})

export type ModifyPrioridadInBodyDto=zod.infer<typeof ModifyPrioridadSchema>["body"]
export type ModifyPrioridadInParamsDto=zod.infer<typeof ModifyPrioridadSchema>["params"]