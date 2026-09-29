import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { TicketSchema } from "../../../ticket/ticket.entity.js";
import { TecnicoSchema } from "../../../tecnico/tecnico.entity.js";
import { asignacionSchema } from "../../../asignacion/asignacion.entity.js";


export class AsignacionSeeder extends Seeder{
    async run(em:EntityManager){

        var Empresas= await em.findAll(EmpresaSchema);

        for(const e of Empresas){
            var tickets=await em.find(TicketSchema,{empresa:e.id})
            var tecnicos=await em.find(TecnicoSchema,{empresa:e.id})

            em.create(asignacionSchema,{fechaCreacion:Date(),tecnico:tecnicos[0]!.dni,ticket:tickets[0]!.id,empresa:e.id})

            await em.flush();
        }
    }
}