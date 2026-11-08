import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyAdminDto:
 *       type: object
 *       required:
 *         - surName
 *         - name
 *         - tele
 *       properties:
 *         surName:
 *           type: string
 *           maxLength: 64
 *           example: "Gómez"
 *         name:
 *           type: string
 *           maxLength: 64
 *           example: "Carlos"
 *         tele:
 *           type: string
 *           pattern: '^\+?[1-9]\d{1,14}$'
 *           example: "+541155559999"
 */

export const ModifyAdminSchema=zod.object({
    body:zod.object({
        surName:zod.string().max(64),
        name:zod.string().max(64),
        tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    }),
    params:zod.object({
        dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
    })
})

export type ModifyAdminBodyDTO = zod.infer<typeof ModifyAdminSchema>["body"];


export type ModifyAdminParamsDTO = zod.infer<typeof ModifyAdminSchema>["params"];