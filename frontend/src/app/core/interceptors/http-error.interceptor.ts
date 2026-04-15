import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Error inesperado';
        if (error.error?.message) {
          message = error.error.message;
        } else if (error.status === 0) {
          message = 'No se pudo conectar con el servidor';
        } else if (error.status === 404) {
          message = 'Recurso no encontrado';
        } else if (error.status === 400) {
          message = error.error?.message || 'Datos inválidos';
        }
        return throwError(() => new Error(message));
      })
    );
  }
}
