import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUsuarioDto:
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
 *         password:
 *           type: string
 *           format: password
 *           example: "ClaveSegura123!"
 *         telefono:
 *           type: string
 *           example: "3411234567"
 *         oficinaId:
 *           type: integer
 *           example: 1
 */

export const createUsuarioSchema=zod.object({
  body:zod.object({
    dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
    surName:zod.string().max(64),
    name:zod.string().max(64),
    tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    pass:zod.string().min(6),
    oficina:zod.number().int().positive(),
  })
})

export type CreateUsuarioInDto=zod.infer<typeof createUsuarioSchema>["body"]