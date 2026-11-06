import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyUsuarioDto:
 *       type: object
 *       properties:
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
 *         oficinaId:
 *           type: integer
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