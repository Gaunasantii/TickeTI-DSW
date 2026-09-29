import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { CategoriaSchema } from "../../../categoria/categoria.entity.js";

export class CategoriaSeeder extends Seeder{
    async run(em:EntityManager){
        var empresas=await em.findAll(EmpresaSchema);
        for(const e of empresas){
            em.create(CategoriaSchema,{nombre:"Software",empresa:e.id})
            em.create(CategoriaSchema,{nombre:"Hardware",empresa:e.id})
            em.create(CategoriaSchema,{nombre:"Redes",empresa:e.id})
            em.create(CategoriaSchema,{nombre:"Recursos Humanos",empresa:e.id})
            em.create(CategoriaSchema,{nombre:"Accesos",empresa:e.id})

            await em.flush()
        }
    }
}