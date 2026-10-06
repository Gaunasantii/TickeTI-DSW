import zod from 'zod'

export const ChangeCategoriaSchema=zod.object({
    body:zod.object({
        categoria:zod.number().min(1)
    }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/,"El id debe ser numerico")
    })
})

export type ChangeCategoriaInBodyDto=zod.infer<typeof ChangeCategoriaSchema>['body']