import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EstadoSchema } from "../../../estado/estado.entity.js";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";

export class EstadoSeeder extends Seeder{
    async run(em:EntityManager){
        var empresas=await em.findAll(EmpresaSchema);
        for(const e of empresas) {
            em.create(EstadoSchema,{
                nombre: "Abierto",
                descripcion: "Ticket recién creado, pendiente de revisión",
                empresa:e.id
            })
            em.create(EstadoSchema,{
                nombre: "En Proceso",
                descripcion: "Ticket asignado a un técnico y en resolución",
                empresa:e.id
            })
            em.create(EstadoSchema,{
                nombre: "Cerrado",
                descripcion: "Ticket resuelto y cerrado",
                empresa:e.id
            })

            await em.flush()

        };
    }
}