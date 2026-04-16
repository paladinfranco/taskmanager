import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TareaListComponent } from './tarea-list/tarea-list.component';
import { TareaFormComponent } from './tarea-form/tarea-form.component';
import { TareaReasignarComponent } from './tarea-reasignar/tarea-reasignar.component';
import { TareaHistorialComponent } from './tarea-reasignar/tarea-historial.component';
import { FilterByEstadoPipe } from '../../shared/pipes/filter-by-estado.pipe';

@NgModule({
  declarations: [
    TareaListComponent,
    TareaFormComponent,
    TareaReasignarComponent,
    TareaHistorialComponent,
    FilterByEstadoPipe
  ],
  imports: [SharedModule],
  exports: [
    TareaListComponent,
    TareaFormComponent,
    TareaReasignarComponent,
    TareaHistorialComponent
  ]
})
export class TareasModule {}
