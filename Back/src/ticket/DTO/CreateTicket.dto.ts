import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTicketDto:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - prioridad
 *         - categoria
 *       properties:
 *         title:
 *           type: string
 *           example: "Fallo de conexión a la impresora de red"
 *         description:
 *           type: string
 *           example: "La impresora de contabilidad no responde a los trabajos de impresión desde la terminal 4."
 *         prioridad:
 *           type: number
 *           minimum: 1
 *           example: 2
 *         categoria:
 *           type: number
 *           minimum: 1
 *           example: 1
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