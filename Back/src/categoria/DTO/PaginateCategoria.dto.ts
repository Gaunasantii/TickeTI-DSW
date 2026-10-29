import zod from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginateCategoriaQuery:
 *       type: object
 *       properties:
 *         page:
 *           type: string
 *           description: Número de página
 *           example: "1"
 *         cantPerPage:
 *           type: string
 *           description: Cantidad de elementos por página
 *           example: "10"
 */

export const PaginateCategoriaSchema = zod.object({
    query: zod.object({
        page:zod.string().regex(/^\d+$/, "El número de página debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "La cantidad por página debe ser numérica")
    })
});

export type PaginateCategoriaDTO = zod.infer<typeof PaginateCategoriaSchema>["query"];