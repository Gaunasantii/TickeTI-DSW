import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     OficinaOutDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Soporte Técnico - Casa Central"
 *         empresaId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 */

export const OficinaOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  empresa:zod.number()
})

export type OficinaDto=zod.infer<typeof OficinaOutSchema>