import zod from 'zod'

export const PersonOutPaginatedSchema=zod.object({
    dni:zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string(),
    type: zod.string(),
    oficina:zod.object({
        id:zod.number(),
        nombre:zod.string()
    }).nullable().transform(o=>{
        if(!o){
            return "No asignada"
        }
        return o.nombre
    })
})

export type personPaginatedDto=zod.infer<typeof PersonOutPaginatedSchema>;