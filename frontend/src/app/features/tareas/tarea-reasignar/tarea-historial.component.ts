import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TareaService } from '../../../core/services/tarea.service';
import { Tarea } from '../../../models/tarea.model';

@Component({
  selector: 'app-tarea-reasignar',
  template: `
    <div *ngIf="tareas.length === 0" class="empty-state">Sin historial de reasignaciones</div>
    <div *ngFor="let t of tareasConHistorial" class="hist-card card">
      <p class="hist-tarea">{{ t.titulo }}</p>
      <div *ngFor="let r of t.reasignaciones" class="hist-row">
        <strong>{{ r.usuarioOrigenNombre }}</strong> → <strong>{{ r.usuarioDestinoNombre }}</strong><br>
        <span class="hist-motivo">{{ r.motivo }}</span>
        <span class="hist-date">{{ r.reasignadoAt | date:'dd/MM/yyyy HH:mm' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .hist-card { padding: 12px 14px; margin-bottom: 8px; }
    .hist-tarea { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
    .hist-row { font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px solid var(--border); }
    .hist-row:last-child { border-bottom: none; margin-bottom: 0; }
    .hist-motivo { display: block; font-style: italic; margin-top: 3px; }
    .hist-date { display: block; font-size: 11px; color: var(--text-hint); margin-top: 2px; }
  `]
})
export class TareaHistorialComponent implements OnChanges {
  @Input() usuarioId!: string;
  tareas: Tarea[] = [];

  get tareasConHistorial(): Tarea[] {
    return this.tareas.filter(t => t.reasignaciones && t.reasignaciones.length > 0);
  }

  constructor(private tareaService: TareaService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioId'] && this.usuarioId) {
      this.tareaService.getByUsuario(this.usuarioId).subscribe(data => this.tareas = data);
    }
  }
}
