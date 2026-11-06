import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteEmpresaDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 */

export const DeleteEmpresaSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})