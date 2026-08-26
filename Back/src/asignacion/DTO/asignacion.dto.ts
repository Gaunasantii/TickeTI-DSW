export class AsignacionDTO {
  constructor(
    public fechaCreacion: Date,
    public estado: boolean = true,
    public ticketId: number,
    public tecnicoDni: string,
    public id: number,
    public fechaCierre?: Date | null,
  ) { }
}
