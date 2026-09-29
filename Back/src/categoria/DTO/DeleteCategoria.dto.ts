import zod, { object } from 'zod'

export const DeleteCategoriaSchema=zod.object({
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})