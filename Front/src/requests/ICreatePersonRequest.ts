
export interface ICreatePersonRequest {
    dni: string,
    surName: string,
    name: string,
    tele: string,
    pass: string,
    oficina?: number,
}