export type EstadoUsuario = 'activo' | 'inactivo';
export type TipoTelefono = 'principal' | 'secundario' | 'otro';

export interface Telefono {
  id?: string;
  telefono: string;
  tipo: TipoTelefono;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  ciudad: string;
  estado: EstadoUsuario;
  createdAt: string;
  updatedAt: string;
  telefonos: Telefono[];
  totalTareas: number;
  tareasCompletadas: number;
  tareasPendientes: number;
}

export interface UsuarioRequest {
  nombre: string;
  email: string;
  ciudad: string;
  estado: EstadoUsuario;
  telefonos: { telefono: string; tipo: TipoTelefono }[];
}
