import zod from 'zod'

export const TicketOutSchema=zod.object({
  id:zod.number(),
  title:zod.string(),
  description:zod.string(),
  estado:zod.number(),
  prioridad:zod.number(),
  categoria:zod.number(),
  usuario:zod.string()
})

export type TicketDto=zod.infer<typeof TicketOutSchema>
