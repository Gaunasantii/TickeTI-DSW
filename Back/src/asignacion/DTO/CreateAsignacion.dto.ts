import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAsignacionDto:
 *       type: object
 *       required:
 *         - ticketId
 *         - tecnicoDni
 *       properties:
 *         ticketId:
 *           type: integer
 *           example: 10
 *         tecnicoDni:
 *           type: string
 *           example: "40123456"
 */

export const CreateAsignacionSchema=zod.object({
    body:zod.object({
        ticket: zod.number().min(1),
        tecnico: zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros").optional(),
    })
})

export type CreateAsignacionInDto=zod.infer<typeof CreateAsignacionSchema>["body"]