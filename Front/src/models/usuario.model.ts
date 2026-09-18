export interface IUsuario{
    id:number,
    name:string,
    email:string,
    surname:string,
    dni:string,
    tele:string,
    oficinaId?:number | null,
    rol:string
}