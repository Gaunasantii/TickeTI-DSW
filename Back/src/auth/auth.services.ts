import { authDAO } from "./auth.DAO.js";
import { JWToken } from "../utils/jwt.js";
import { Person } from "../persona/person.entity.js";
import { UnauthorizedError } from "../utils/base.error.js";
import { comparePassword } from "../utils/password.js";

export class AuthService {
  static async Login(pass: string, email: string) {
    const user: Person | null = await authDAO.getUser(email);
    if (!user) throw new UnauthorizedError("Credenciales Invalidas");

    const passOk = await comparePassword(pass, user.pass);
    if (!passOk) throw new UnauthorizedError("Credenciales invalidas");
    
    const token = JWToken.createToken(user)
    return {token,user};
  }
}