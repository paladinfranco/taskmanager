import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, UsuarioRequest } from '../../models/usuario.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private url = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<ApiResponse<Usuario[]>>(this.url)
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<Usuario> {
    return this.http.get<ApiResponse<Usuario>>(`${this.url}/${id}`)
      .pipe(map(r => r.data));
  }

  create(dto: UsuarioRequest): Observable<Usuario> {
    return this.http.post<ApiResponse<Usuario>>(this.url, dto)
      .pipe(map(r => r.data));
  }

  update(id: string, dto: UsuarioRequest): Observable<Usuario> {
    return this.http.put<ApiResponse<Usuario>>(`${this.url}/${id}`, dto)
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`)
      .pipe(map(() => void 0));
  }
}
