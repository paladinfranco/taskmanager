import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Tarea } from '../../../models/tarea.model';
import { Usuario } from '../../../models/usuario.model';
import { TareaService } from '../../../core/services/tarea.service';
import { ToastService } from '../../../shared/components/toast/toast.service';

type Filtro = 'todas' | 'pendiente' | 'completada';

@Component({
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.scss']
})
export class TareaListComponent implements OnChanges {
  @Input() usuarioId!: string;
  @Input() usuarios: Usuario[] = [];
  @Output() tareaChanged = new EventEmitter<void>();

  tareas: Tarea[] = [];
  filtro: Filtro = 'todas';
  showForm = false;
  confirmDelete = false;
  tareaToDelete: Tarea | null = null;
  showReasignar = false;
  tareaToReasignar: Tarea | null = null;
  loading = false;

  constructor(
    private tareaService: TareaService,
    private toast: ToastService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioId'] && this.usuarioId) {
      this.loadTareas();
    }
  }

  loadTareas(): void {
    this.loading = true;
    this.tareaService.getByUsuario(this.usuarioId).subscribe({
      next: (data) => { this.tareas = data; this.loading = false; },
      error: (err) => { this.toast.show(err.message, 'error'); this.loading = false; }
    });
  }

  get tareasFiltradas(): Tarea[] {
    if (this.filtro === 'todas') return this.tareas;
    return this.tareas.filter(t => t.estado === this.filtro);
  }

  setFiltro(f: Filtro): void { this.filtro = f; }

  toggle(t: Tarea): void {
    this.tareaService.toggleEstado(t.id).subscribe({
      next: () => {
        this.toast.show(
          t.estado === 'pendiente' ? 'Tarea completada' : 'Tarea marcada como pendiente',
          'success'
        );
        this.loadTareas();
        this.tareaChanged.emit();
      },
      error: (err) => this.toast.show(err.message, 'error')
    });
  }

  askDelete(t: Tarea): void { this.tareaToDelete = t; this.confirmDelete = true; }

  doDelete(): void {
    if (!this.tareaToDelete) return;
    this.tareaService.delete(this.tareaToDelete.id).subscribe({
      next: () => {
        this.toast.show('Tarea eliminada', 'success');
        this.confirmDelete = false;
        this.tareaToDelete = null;
        this.loadTareas();
        this.tareaChanged.emit();
      },
      error: (err) => { this.toast.show(err.message, 'error'); this.confirmDelete = false; }
    });
  }

  openReasignar(t: Tarea): void { this.tareaToReasignar = t; this.showReasignar = true; }

  onReasignado(): void {
    this.showReasignar = false;
    this.tareaToReasignar = null;
    this.loadTareas();
    this.tareaChanged.emit();
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadTareas();
    this.tareaChanged.emit();
  }
}
