import zod from 'zod'

export const TicketOutSchema=zod.object({
  id:zod.number(),
  title:zod.string(),
  description:zod.string(),
  estado:zod.object({
    id:zod.number(),
    nombre:zod.string()
  }).nullable().transform((val)=>val?val:"Estado no asignado"),
  prioridad:zod.object({
    id:zod.number(),
    nombre:zod.string()
  }).nullable().transform((val)=>val?val:"Prioridad no asignada"),
  categoria:zod.object({
    id:zod.number(),
    nombre:zod.string()
  }).nullable().transform((val)=>val?val:"Categoria no asignada"),
  usuario:zod.string(),
  fechaCreacion:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})),
  fechaCierre:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})).nullable(),
  solucion:zod.string().nullable().transform((val) => 
    (val && val.trim() !== "") ? val : "Sin solucion"
  ),
  asignaciones:zod.array(
              zod.object({
                id:zod.number(),
                fechaCierre:zod.date().nullable(),
                estado:zod.boolean()
              })
          )
}).transform((val)=>{

  const estaTomado = val.asignaciones.some(asignacion => asignacion.estado && !asignacion.fechaCierre);

  const {asignaciones,...resto}=val;

  return {
    ...resto,
    estaTomado:estaTomado
  };

})

export type TicketDto=zod.infer<typeof TicketOutSchema>
