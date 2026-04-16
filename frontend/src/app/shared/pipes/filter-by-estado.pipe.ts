import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../../models/tarea.model';

@Pipe({ name: 'filterByEstado' })
export class FilterByEstadoPipe implements PipeTransform {
  transform(tareas: Tarea[], estado: string): number {
    return tareas.filter(t => t.estado === estado).length;
  }
}
