import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyUsuarioDto:
 *       type: object
 *       required:
 *         - surName
 *         - name
 *         - tele
 *         - oficina
 *       properties:
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
 *         oficina:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           example: 1
 */

export const ModifyUsuarioSchema=zod.object({
    body:zod.object({
        surName:zod.string().max(64),
        name:zod.string().max(64),
        tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
        oficina:zod.number().positive()
    }),
    params:zod.object({
        dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
    })
})

export type ModifyUsuarioBodyDTO = zod.infer<typeof ModifyUsuarioSchema>["body"];
export type ModifyUsuarioParamsDTO = zod.infer<typeof ModifyUsuarioSchema>["params"];