import zod from 'zod'


/**
 * @openapi
 * components:
 *   schemas:
 *     EstadoOutDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         esEstadoInicial:
 *           type: boolean
 *         esEstadoFinal:
 *           type: boolean
 *         esEstadoBase:
 *           type: boolean
 */
export const EstadoOutSchema=zod.object({
  id:zod.number(),
  nombre:zod.string(),
  descripcion:zod.string(),
  esEstadoInicial:zod.boolean(),
  esEstadoFinal:zod.boolean(),
  esEstadoBase:zod.boolean()
})

export type EstadoDto=zod.infer<typeof EstadoOutSchema>