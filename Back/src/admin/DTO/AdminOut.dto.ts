import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     AdminOutDto:
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *           example: "35123456"
 *         nombre:
 *           type: string
 *           example: "Carlos"
 *         apellido:
 *           type: string
 *           example: "Gómez"
 *         email:
 *           type: string
 *           format: email
 *           example: "admin@ejemplo.com"
 *         telefono:
 *           type: string
 *           example: "3415559999"
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

export const AdminOutSchema=zod.object({
    dni: zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string()
})

export type AdminOutDto = zod.infer<typeof AdminOutSchema>;