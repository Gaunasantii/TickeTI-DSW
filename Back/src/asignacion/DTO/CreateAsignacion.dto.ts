import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAsignacionDto:
 *       type: object
 *       required:
 *         - ticket
 *       properties:
 *         ticket:
 *           type: number
 *           minimum: 1
 *           example: 10
 *         tecnico:
 *           type: string
 *           minLength: 8
 *           pattern: '^\d+$'
 *           example: "40123456"
 *           description: DNI del técnico asignado; opcional.
 */

export const CreateAsignacionSchema=zod.object({
    body:zod.object({
        ticket: zod.number().min(1),
        tecnico: zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros").optional(),
    })
})

export type CreateAsignacionInDto=zod.infer<typeof CreateAsignacionSchema>["body"]