export type EstadoTarea = 'pendiente' | 'completada';

export interface Reasignacion {
  id: string;
  usuarioOrigenId: string;
  usuarioOrigenNombre: string;
  usuarioDestinoId: string;
  usuarioDestinoNombre: string;
  motivo: string;
  reasignadoAt: string;
}

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
  usuarioId: string;
  usuarioNombre: string;
  createdAt: string;
  updatedAt: string;
  reasignaciones: Reasignacion[];
}

export interface TareaRequest {
  titulo: string;
  descripcion: string;
  usuarioId: string;
}

export interface ReasignacionRequest {
  usuarioDestinoId: string;
  motivo: string;
}
