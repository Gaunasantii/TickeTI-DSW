import zod from 'zod'

export const DeleteAsignacionSchema=zod.object({
    params:zod.object({
            id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
        })
})