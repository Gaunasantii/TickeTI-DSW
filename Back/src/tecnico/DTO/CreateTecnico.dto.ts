import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTecnicoDto:
 *       type: object
 *       required:
 *         - dni
 *         - surName
 *         - name
 *         - tele
 *         - pass
 *       properties:
 *         dni:
 *           type: string
 *           minLength: 8
 *           pattern: '^\d+$'
 *           example: "40123456"
 *         surName:
 *           type: string
 *           maxLength: 64
 *           example: "Pérez"
 *         name:
 *           type: string
 *           maxLength: 64
 *           example: "Juan"
 *         tele:
 *           type: string
 *           pattern: '^\+?[1-9]\d{1,14}$'
 *           example: "+543415551234"
 *         pass:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "ClaveTecnico123!"
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