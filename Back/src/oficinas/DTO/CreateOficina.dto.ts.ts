import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOficinaDto:
 *       type: object
 *       required:
 *         - nombre
 *         - empresaId
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Soporte Técnico - Casa Central"
 *         empresaId:
 *           type: integer
 *           example: 1
 */

export const CreateOficinaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty(),
    })
})

export type CreateOficinaInDto=zod.infer<typeof CreateOficinaSchema>["body"]