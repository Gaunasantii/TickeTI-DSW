import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ResolveTicketDto:
 *       type: object
 *       required:
 *         - solucion
 *       properties:
 *         solucion:
 *           type: string
 *           minLength: 1
 *           example: "Se reinició el spooler de impresión y se reemplazó el cable Ethernet defectuoso."
 */

export const ResolveTicketSchema=zod.object({
    body:zod.object({
        solucion:zod.string().min(1,{message:"La solucion no puede estar vacia"})
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/, { message: "El id debe ser un número" })
    })
})

export type ResolveTicketInBodyDto=zod.infer<typeof ResolveTicketSchema>["body"]