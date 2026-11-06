import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     UsuarioOutDto:
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *           example: "47107024"
 *         nombre:
 *           type: string
 *           example: "Pablo"
 *         apellido:
 *           type: string
 *           example: "Perez"
 *         email:
 *           type: string
 *           format: email
 *           example: "pablo@ejemplo.com"
 *         telefono:
 *           type: string
 *           example: "3411234567"
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

export const UsuarioOutSchema=zod.object({
    dni: zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string(),
    oficina: zod.number()
})

export type UsuarioOutDto = zod.infer<typeof UsuarioOutSchema>;
