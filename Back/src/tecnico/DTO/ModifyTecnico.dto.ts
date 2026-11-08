import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyTecnicoDto:
 *       type: object
 *       required:
 *         - surName
 *         - name
 *         - tele
 *       properties:
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
 */

export const ModifyTecnicoSchema=zod.object({
    body:zod.object({
        surName:zod.string().max(64),
        name:zod.string().max(64),
        tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    }),
    params:zod.object({
        dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
    })
})

export type ModifyTecnicoBodyDTO = zod.infer<typeof ModifyTecnicoSchema>["body"];
export type ModifyTecnicoParamsDTO = zod.infer<typeof ModifyTecnicoSchema>["params"];