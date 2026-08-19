export class UsuarioDTO {
  constructor(
    public dni: string,
    public surName: string,
    public name: string,
    public tele: string,
    public mail: string,
    public oficinaId?: number | null
  ) {}
}
