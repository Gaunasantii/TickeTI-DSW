import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PrioridadOutDto:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - tiempoLimiteResolucion
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID de la prioridad
 *           example: 1
 *         nombre:
 *           type: string
 *           description: El nombre de la prioridad
 *           example: Alta
 *         tiempoLimiteResolucion:
 *           type: integer
 *           description: El tiempo límite de resolución en horas
 *           example: 24
 */

export const PrioridadOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  tiempoLimiteResolucion:zod.number()
})

export type PrioridadDto=zod.infer<typeof PrioridadOutSchema>