import { authDAO } from "./auth.DAO.js";
import { JWToken } from "../utils/jwt.js";
import { Person } from "../persona/person.entity.js";
import { Jwt } from "jsonwebtoken";

export class AuthService{
    static async Login(pass:string,email:string){
      const user:Person = await authDAO.getUser(email,pass);
      const token=JWToken.createToken(user)
      return token;
  }
}