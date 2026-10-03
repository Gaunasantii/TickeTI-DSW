import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { EmpresaSeeder } from './EmpresaSeeder.js';
import { PrioridadSeeder } from './PrioridadSeeder.js';
import { EstadoSeeder } from './EstadoSeeder.js';
import { CategoriaSeeder } from './CategoriaSeeder.js';
import { OficinaSeeder } from './OficinaSeeder.js';
import { AdministradorSeeder } from './AdministradorSeeder.js';
import { TecnicoSeeder } from './TecnicoSeeder.js';
import { UsuarioSeeder } from './UsuarioSeeder.js';
import { TicketSeeder } from './TicketSeeder.js';
import { AsignacionSeeder } from './AsignacionSchema.js';
import { SuperAdminSeeder } from './SuperAdminSeeder.js';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      SuperAdminSeeder,
      EmpresaSeeder,
      PrioridadSeeder,
      EstadoSeeder,
      CategoriaSeeder,
      OficinaSeeder,
      AdministradorSeeder,
      TecnicoSeeder,
      UsuarioSeeder,
      TicketSeeder,
      AsignacionSeeder
    ]);
  }
}