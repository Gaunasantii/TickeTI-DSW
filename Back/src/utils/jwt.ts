import jwt from "jsonwebtoken";
import { Person } from "../persona/person.entity.js";

export class JWToken{
  static createToken(user:Person){
    return jwt.sign({id:user.dni,rol:user.type,email:user.mail,name:user.name},"Mi secreto",{expiresIn:"1H"})
  }
}