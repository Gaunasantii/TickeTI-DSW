export class loginDto{
    public dni:string;
    public rol:string;
    public name:string;

    constructor(user:any){
        this.dni=user.dni;
        this.rol=user.type;
        this.name=user.name;
    }
}