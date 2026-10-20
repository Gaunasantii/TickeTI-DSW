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
                tiempoLimiteResolucion: 3, //Tener en cuenta q este valor esta en dias
                empresa:empresa.id
            })
            em.create(PrioridadSchema,{
                nombre: "Media",
                tiempoLimiteResolucion: 2, //Tener en cuenta q este valor esta en dias
                empresa:empresa.id
            })
            em.create(PrioridadSchema,{
                nombre: "Alta",
                tiempoLimiteResolucion: 1, //Tener en cuenta q este valor esta en dias
                empresa:empresa.id
            })   

            await em.flush();
        };
    }
}