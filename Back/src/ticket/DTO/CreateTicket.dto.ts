import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTicketDto:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *         - categoriaId
 *         - prioridadId
 *       properties:
 *         titulo:
 *           type: string
 *           example: "Fallo de conexión a la impresora de red"
 *         descripcion:
 *           type: string
 *           example: "La impresora de contabilidad no responde a los trabajos de impresión desde la terminal 4."
 *         categoriaId:
 *           type: integer
 *           example: 1
 *         prioridadId:
 *           type: integer
 *           example: 2
 */

export const CreateTicketSchema=zod.object({
    body:zod.object({
        title:zod.string(),
        description:zod.string(),
        prioridad:zod.number().min(1),
        categoria:zod.number().min(1)
    })
})

export type CreateTicketInDto=zod.infer<typeof CreateTicketSchema>['body']