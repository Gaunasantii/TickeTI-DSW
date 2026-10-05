import zod from 'zod'

export const TicketOutSchema=zod.object({
  id:zod.number(),
  title:zod.string(),
  description:zod.string(),
  estado:zod.number(),
  prioridad:zod.number(),
  categoria:zod.number(),
  usuario:zod.string(),
  fechaCreacion:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})),
  fechaCierre:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})).nullable(),
  solucion:zod.string().nullable(),
})

export type TicketDto=zod.infer<typeof TicketOutSchema>
