import zod from 'zod'

export const PaginateEmpresaOutSchema=zod.object({
    id:zod.number(),
    nombre:zod.string(),
    personas:zod.array(zod.object({
        dni:zod.string()
    })),
    admin:zod.array(zod.object({
        dni:zod.string(),
        name:zod.string(),
        surName:zod.string(),
        tele:zod.string()
    })).max(1,"La empresa solo puede tener un administrador")
}).transform(({id,nombre,admin,personas})=>{

    const administrador = admin[0]

    return({

        id:id,
        nombre:nombre,
        nombreAdmin:administrador?`${administrador!.name} ${administrador!.surName}`:"No asignado",
        telAdmin:administrador?administrador!.tele:"No asignado",
        cantidadEmpleados:personas.length,
        admin: administrador || null,
    })
})

export type EmpresaPaginatedDto=zod.infer<typeof PaginateEmpresaOutSchema>