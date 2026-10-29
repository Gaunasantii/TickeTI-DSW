import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEstadoDto:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *       required:
 *         - nombre
 *         - descripcion
 */

export const CreateEstadoSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty(),
        descripcion:zod.string().nonempty().max(200)
    })
})

export type CreateEstadoInDto=zod.infer<typeof CreateEstadoSchema>["body"]