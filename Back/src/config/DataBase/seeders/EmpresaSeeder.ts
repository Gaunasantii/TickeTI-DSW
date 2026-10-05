import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";

export class EmpresaSeeder extends Seeder{
    async run(em:EntityManager):Promise<void>{
        const Empresa1=em.create(EmpresaSchema,{nombre:"Umbrella"});
        const Empresa2=em.create(EmpresaSchema,{nombre:"Stark Industries"});
        await em.flush()
    }
}