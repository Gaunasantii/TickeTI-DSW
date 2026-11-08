import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOficinaDto:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 1
 *           example: "Soporte Técnico - Casa Central"
 */

export const CreateOficinaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty(),
    })
})

export type CreateOficinaInDto=zod.infer<typeof CreateOficinaSchema>["body"]