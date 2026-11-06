import zod from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAdminDto:
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
 *         password:
 *           type: string
 *           format: password
 *           example: "AdminSeguro123!"
 *         telefono:
 *           type: string
 *           example: "3415559999"
 *         oficinaId:
 *           type: integer
 *           example: 1
 */

export const createAdminSchema=zod.object({
  body:zod.object({
    dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
    surName:zod.string().max(64),
    name:zod.string().max(64),
    tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    pass:zod.string().min(6),
    empresa:zod.number().min(1)
  })
})

export type createAdminInDto=zod.infer<typeof createAdminSchema>["body"]




