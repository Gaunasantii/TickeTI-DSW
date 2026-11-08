import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUsuarioDto:
 *       type: object
 *       required:
 *         - dni
 *         - surName
 *         - name
 *         - tele
 *         - pass
 *         - oficina
 *       properties:
 *         dni:
 *           type: string
 *           minLength: 8
 *           pattern: '^\d+$'
 *           example: "47107024"
 *         surName:
 *           type: string
 *           maxLength: 64
 *           example: "Perez"
 *         name:
 *           type: string
 *           maxLength: 64
 *           example: "Pablo"
 *         tele:
 *           type: string
 *           pattern: '^\+?[1-9]\d{1,14}$'
 *           example: "+543411234567"
 *         pass:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "ClaveSegura123!"
 *         oficina:
 *           type: integer
 *           example: 1
 *           minimum: 1
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