import zod from 'zod'
import type { ModifyAdminSchema } from '../../admin/DTO/ModifyAdmin.dto.js'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyTicketDto:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: "Fallo de conexión a la impresora de red - Actualizado"
 *         description:
 *           type: string
 *           example: "Se verificó cable de red y sigue sin enviar respuestas."
 */

export const ModifyTicketSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    }),
    body:zod.object({
        title:zod.string(),
        description:zod.string(),
    })
})

export type ModifyTicketInBodyDto=zod.infer<typeof ModifyTicketSchema>['body']
export type ModifyTicketInParamsDto=zod.infer<typeof ModifyTicketSchema>['params']
