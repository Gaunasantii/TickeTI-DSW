import { Seeder } from "@mikro-orm/seeder";
import { PrioridadSchema } from "../../../prioridad/prioridad.entity.js";
import { EntityManager } from "@mikro-orm/core";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";

export class PrioridadSeeder extends Seeder{
    async run(em:EntityManager):Promise<void>{
        const empresas=await em.findAll(EmpresaSchema);
        for(const empresa of empresas) {
            em.create(PrioridadSchema,{
                nombre:"Baja",
                tiempoLimiteResolucion: 432000,
                empresa:empresa.id
            })
            em.create(PrioridadSchema,{
                nombre: "Media",
                tiempoLimiteResolucion: 259200,
                empresa:empresa.id
            })
            em.create(PrioridadSchema,{
                nombre: "Alta",
                tiempoLimiteResolucion: 86400,
                empresa:empresa.id
            })   

            await em.flush();
        };
    }
}