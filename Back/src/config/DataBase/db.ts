import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import dotenv from 'dotenv';
import options from "./db.config.js";

dotenv.config();

console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
})

export let orm: MikroORM;

export async function initOrm() {
  try {
    orm = await MikroORM.init(options)
  } catch (e) {
    process.exit(1)
  }
}


export const syncSchema = async () => {
  const generator = orm.schema;
  await generator.update()
}

export const checkDb = async () => {
  try {
    await orm.isConnected()
    console.log('DB conectada correctamente')
  } catch (e) {
    console.error('DB no conectada', e)
  }
}
