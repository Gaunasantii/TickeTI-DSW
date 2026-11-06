import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTecnicoDto:
 *       type: object
 *       required:
 *         - dni
 *         - nombre
 *         - apellido
 *         - email
 *         - password
 *         - oficinaId
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
 *         password:
 *           type: string
 *           format: password
 *           example: "ClaveTecnico123!"
 *         telefono:
 *           type: string
 *           example: "3415551234"
 *         oficinaId:
 *           type: integer
 *           example: 1
 */

export const createTecnicoSchema=zod.object({
  body:zod.object({
    dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
    surName:zod.string().max(64),
    name:zod.string().max(64),
    tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    pass:zod.string().min(6),
  })
})

export type CreateTecnicoInDto=zod.infer<typeof createTecnicoSchema>["body"]