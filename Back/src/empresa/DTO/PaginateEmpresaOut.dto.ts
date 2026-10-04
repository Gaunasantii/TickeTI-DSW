import zod from 'zod'

export const PaginateEmpresaOutSchema=zod.object({
    nombre:zod.string(),
    personas:zod.array(zod.object({
        dni:zod.string()
    })),
    admin:zod.array(zod.object({
        dni:zod.string(),
        name:zod.string(),
        surName:zod.string(),
        tele:zod.string()
    })).min(1,"La empresa debe tener al menos un administrador").max(1,"La empresa solo puede tener un administrador")
}).transform(({nombre,admin,personas})=>{

    const administrador = admin[0]

    return({
        nombre:nombre,
        nombreAdmin:`${administrador!.name} ${administrador!.surName}`,
        telAdmin:administrador!.tele,
        cantidadEmpleados:personas.length
    })
})

export type EmpresaPaginatedDto=zod.infer<typeof PaginateEmpresaOutSchema>