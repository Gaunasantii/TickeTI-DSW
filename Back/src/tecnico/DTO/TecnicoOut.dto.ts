import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     TecnicoOutDto:
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *           example: "40123456"
 *         nombre:
 *           type: string
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "tecnico@ejemplo.com"
 *         telefono:
 *           type: string
 *           example: "3415551234"
 *         oficina:
 *           $ref: '#/components/schemas/OficinaOutDto'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 */

export const TecnicoOutSchema=zod.object({
    dni: zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string()
})

export type TecnicoOutDto = zod.infer<typeof TecnicoOutSchema>;