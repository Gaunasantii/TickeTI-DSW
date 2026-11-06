import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     OficinaPaginatedOutDto:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         cantPerPage:
 *           type: integer
 *           example: 10
 *         totalItems:
 *           type: integer
 *           example: 15
 *         totalPages:
 *           type: integer
 *           example: 2
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OficinaOutDto'
 */

export const OficinaPaginatedOutSchema=zod.object({
    id:zod.number(),
    nombre:zod.string(),
    usuarios:zod.array(zod.object({
        dni:zod.string()
    }))
}).transform(({usuarios,...r})=>({...r,cantidadUsuarios:usuarios.length}))

export type OficinaOutDtoPag=zod.infer<typeof OficinaPaginatedOutSchema>