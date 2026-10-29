import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePrioridadDto:
 *       type: object
 *       required:
 *         - nombre
 *         - tiempoLimiteResolucion
 *       properties:
 *         nombre:
 *           type: string
 *           description: El nombre de la prioridad
 *           example: Alta
 *         tiempoLimiteResolucion:
 *           type: integer
 *           description: El tiempo límite de resolución en horas
 *           example: 24
 */

export const CreatePrioridadSchema=zod.object({
    body:zod.object({
        nombre:zod.string(),
        tiempoLimiteResolucion:zod.number().min(1)
    })
})

export type CreatePrioridadInDto=zod.infer<typeof CreatePrioridadSchema>["body"]