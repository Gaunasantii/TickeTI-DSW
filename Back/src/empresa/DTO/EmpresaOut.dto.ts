import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     EmpresaOutDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         razonSocial:
 *           type: string
 *           example: "Tech Solutions S.A."
 *         cuit:
 *           type: string
 *           example: "30-71234567-8"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 */

export const EmpresaOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string()
})

export type EmpresaDto=zod.infer<typeof EmpresaOutSchema>