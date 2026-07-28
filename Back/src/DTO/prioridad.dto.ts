export class PrioridadDTO {
  constructor(
    public nombre: string,
    public tiempoLimiteResolucion: number,
    public id?: number
  ) {}
}
