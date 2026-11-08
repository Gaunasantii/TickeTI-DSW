import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyOficinaDto:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 1
 *           example: "Infraestructura y Redes"
 */

export const ModifyOficinaSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    }),
    body:zod.object({
        nombre:zod.string().nonempty()
    })
})

export type ModifyOficinaInParamsDto=zod.infer<typeof ModifyOficinaSchema>["params"]
export type ModifyOficinaInBodyDto=zod.infer<typeof ModifyOficinaSchema>["body"]