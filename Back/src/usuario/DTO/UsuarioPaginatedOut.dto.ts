import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     UsuarioPaginatedOutDto:
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
 *           example: 30
 *         totalPages:
 *           type: integer
 *           example: 3
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UsuarioOutDto'
 */

export const UserOutPaginatedSchema=zod.object({
    dni:zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string(),
    type: zod.string(),
    oficina:zod.object({
        id:zod.number(),
        nombre:zod.string()
    }).transform(o=>o.nombre).optional()
})

export type usuarioPaginatedDto=zod.infer<typeof UserOutPaginatedSchema>;