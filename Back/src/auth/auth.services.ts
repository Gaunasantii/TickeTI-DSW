import { authDAO } from "./auth.DAO.js";
import { JWToken } from "../utils/jwt.js";
import { Person } from "../persona/person.entity.js";

export class AuthService {
  static async Login(pass: string, email: string) {
    const user: Person | null = await authDAO.getUser(email, pass);
    if (!user) throw new Error("Credenciales invalidas");
    //aqui habria que colocar el metodo con el hash
    if (user.pass != pass) throw new Error("Credenciales invalidas");
    const token = JWToken.createToken(user)
    return token;
  }
}