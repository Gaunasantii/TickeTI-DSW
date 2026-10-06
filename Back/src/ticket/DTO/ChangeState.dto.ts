import zod from 'zod'

export const ChangeStateSchema=zod.object({
    body:zod.object({
        estado:zod.number().min(1)
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/,"El id debe ser numerico")
    })
})

export type ChangeStateInBodyDto=zod.infer<typeof ChangeStateSchema>['body']