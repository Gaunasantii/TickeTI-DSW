import zod from 'zod'

export const OficinaPaginatedOutSchema=zod.object({
    id:zod.number(),
    nombre:zod.string(),
    usuarios:zod.array(zod.object({
        dni:zod.string()
    }))
}).transform(({usuarios,...r})=>({...r,cantidadUsuarios:usuarios.length}))

export type OficinaOutDtoPag=zod.infer<typeof OficinaPaginatedOutSchema>