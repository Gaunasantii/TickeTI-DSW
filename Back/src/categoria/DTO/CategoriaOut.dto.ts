import zod from'zod'

/**
 * @openapi
 * 
 * components:
 *   schemas:
 *      CategoriaOutDto:
 *        type: object
 *        properties:
 *          id:
 *            type: int
 *            example: 2
 *          nombre:
 *            type: string
 *            example: hardware
 * 
 * 
 * 
 * 
 * 
 */

export const CategoriaOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string()
})

export type CategoriaDto=zod.infer<typeof CategoriaOutSchema>