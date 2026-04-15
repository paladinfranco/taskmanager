import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tarea, TareaRequest, ReasignacionRequest } from '../../models/tarea.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class TareaService {

  private url = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  getByUsuario(usuarioId: string): Observable<Tarea[]> {
    return this.http.get<ApiResponse<Tarea[]>>(`${this.url}/usuario/${usuarioId}`)
      .pipe(map(r => r.data));
  }

  create(dto: TareaRequest): Observable<Tarea> {
    return this.http.post<ApiResponse<Tarea>>(this.url, dto)
      .pipe(map(r => r.data));
  }

  toggleEstado(id: string): Observable<Tarea> {
    return this.http.patch<ApiResponse<Tarea>>(`${this.url}/${id}/toggle`, {})
      .pipe(map(r => r.data));
  }

  reasignar(id: string, dto: ReasignacionRequest): Observable<Tarea> {
    return this.http.patch<ApiResponse<Tarea>>(`${this.url}/${id}/reasignar`, dto)
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`)
      .pipe(map(() => void 0));
  }
}
