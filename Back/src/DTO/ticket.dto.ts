export class TicketDTO {
  constructor(
    public title: string,
    public description: string,
    public estadoId?: number | null,
    public prioridadId?: number | null,
    public categoriaId?: number | null,
    public usuarioDni?: string | null,
    public id?: number
  ) {}
}
