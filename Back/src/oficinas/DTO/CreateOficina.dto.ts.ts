import zod from 'zod'

export const CreateOficinaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty(),
    })
})

export type CreateOficinaInDto=zod.infer<typeof CreateOficinaSchema>["body"]