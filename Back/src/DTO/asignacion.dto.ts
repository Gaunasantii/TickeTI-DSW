export class AsignacionDTO {
  constructor(
    public fechaCreacion?: Date,
    public fechaCierre?: Date | null,
    public estado: boolean = true,
    public ticketId?: number | null,
    public tecnicoDni?: string | null,
    public id?: number
  ) {}
}
