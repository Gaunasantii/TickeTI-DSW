import bcrypt from "bcryptjs";

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

export const hashPassword = (plain: string) => bcrypt.hash(plain, SALT_ROUNDS);

export const comparePassword =  (plain: string, hash: string) => bcrypt.compare(plain, hash);