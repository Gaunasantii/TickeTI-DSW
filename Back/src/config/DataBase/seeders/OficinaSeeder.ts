import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { OficinaSchema } from "../../../oficinas/oficina.entity.js";

export class OficinaSeeder extends Seeder{
    async run(em:EntityManager){
        var empresas=await em.findAll(EmpresaSchema);
        for(const e of empresas){
            em.create(OficinaSchema,{nombre:"Oficina BSAS",empresa:e.id});
            em.create(OficinaSchema,{nombre:"Oficina Rosario", empresa:e.id});

            await em.flush();
        };
    }
}