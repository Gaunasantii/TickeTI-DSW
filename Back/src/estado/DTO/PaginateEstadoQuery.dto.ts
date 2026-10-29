import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginateEstadoQueryDto:
 *       type: object
 *       properties:
 *         page:
 *           type: string
 *         cantPerPage:
 *           type: string
 *       required:
 *         - page
 *         - cantPerPage
 */
export const PaginateEstadoQuerySchema = zod.object({
  query:zod.object({
          page:zod.string().regex(/^\d+$/, "El Dato debe ser numérico"),
          cantPerPage:zod.string().regex(/^\d+$/, "El Dato debe ser numérico")
      })
})

export type PaginateEstadoQueryDto = zod.infer<typeof PaginateEstadoQuerySchema>["query"];