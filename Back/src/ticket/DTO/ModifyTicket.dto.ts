import zod from 'zod'
import type { ModifyAdminSchema } from '../../admin/DTO/ModifyAdmin.dto.js'

export const ModifyTicketSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    }),
    body:zod.object({
        title:zod.string(),
        description:zod.string(),
        estado:zod.number().min(1),
        prioridad:zod.number().min(1),
        categoria:zod.number().min(1),
    })
})

export type ModifyTicketInBodyDto=zod.infer<typeof ModifyTicketSchema>['body']
export type ModifyTicketInParamsDto=zod.infer<typeof ModifyTicketSchema>['params']
