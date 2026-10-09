export interface OficinaItem {
  id: number | string;
  nombre: string;
}

export interface UsuarioItem {
  dni: string;
  name: string;
  surName?: string;
  mail?: string;
  tele?: string;
  type?: string;
  rol?: string;
  oficina?: { id: number | string; nombre: string } | number | string | null;
}
