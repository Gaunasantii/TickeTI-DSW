import zod from 'zod'

export const TicketOutSchema=zod.object({
  id:zod.number(),
  title:zod.string(),
  description:zod.string(),
  estado:zod.number().nullable().transform((val)=>val?val:"Estado no asignado"),
  prioridad:zod.number().nullable().transform((val)=>val?val:"Prioridad no asignada"),
  categoria:zod.number().nullable().transform((val)=>val?val:"Categoria no asignada"),
  usuario:zod.string(),
  fechaCreacion:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})),
  fechaCierre:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})).nullable(),
  solucion:zod.string().nullable().transform((val)=>val?val:"Sin solucion"),
})

export type TicketDto=zod.infer<typeof TicketOutSchema>
