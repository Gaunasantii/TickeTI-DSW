import jwt from "jsonwebtoken";
import { Person } from "../persona/person.entity.js";

export const JWT_SECRET = process.env.JWT_SECRET || "Mi secreto";

export class JWToken {
  static createToken(user: Person) {
    return jwt.sign(
      {
        dni: user.dni,
        rol: user.type,
        email: user.mail,
        name: user.name,
        empresa:user.empresa?.id
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
  }
}