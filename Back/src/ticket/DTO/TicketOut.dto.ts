import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     TicketOutDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         titulo:
 *           type: string
 *           example: "Fallo de conexión a la impresora de red"
 *         descripcion:
 *           type: string
 *           example: "La impresora de contabilidad no responde a los trabajos de impresión."
 *         solucion:
 *           type: string
 *           nullable: true
 *           example: "Se reinició el spooler de impresión."
 *         categoria:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nombre:
 *               type: string
 *               example: "Hardware"
 *         prioridad:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 2
 *             nombre:
 *               type: string
 *               example: "Alta"
 *         estado:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nombre:
 *               type: string
 *               example: "Abierto"
 *         usuario:
 *           $ref: '#/components/schemas/UsuarioOutDto'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T14:30:00Z"
 */

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
