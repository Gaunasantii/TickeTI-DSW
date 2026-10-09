export interface EstadoItem {
  id: number | string;
  nombre: string;
  descripcion?: string;
}

export interface TicketItem {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  fechaCreacion?: string | Date;
  fecha_creacion?: string | Date;
  createdAt?: string | Date;
  fechaCierre?: string | Date | null;
  fecha_cierre?: string | Date | null;
  estado?: { id?: number | string; nombre: string } | number | string;
  prioridad?: { id?: number | string; nombre: string } | number | string;
  categoria?: { id?: number | string; nombre: string } | number | string;
  usuario?: { nombre?: string; dni?: string } | string;
  usuarioDni?: string;
}
