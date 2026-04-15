import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from '../../../models/tarea.model';
import { Usuario } from '../../../models/usuario.model';
import { TareaService } from '../../../core/services/tarea.service';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-tarea-reasignar-modal',
  templateUrl: './tarea-reasignar.component.html',
  styleUrls: ['./tarea-reasignar.component.scss']
})
export class TareaReasignarComponent implements OnInit {
  @Input() tarea!: Tarea;
  @Input() usuarios: Usuario[] = [];
  @Output() reasignado = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  saving = false;

  get otrosUsuarios(): Usuario[] {
    return this.usuarios.filter(u => u.id !== this.tarea?.usuarioId);
  }

  constructor(private fb: FormBuilder, private tareaService: TareaService, private toast: ToastService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      usuarioDestinoId: [this.otrosUsuarios[0]?.id || '', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.tareaService.reasignar(this.tarea.id, this.form.value).subscribe({
      next: () => {
        this.toast.show('Tarea reasignada correctamente', 'success');
        this.saving = false;
        this.reasignado.emit();
      },
      error: (err) => { this.toast.show(err.message, 'error'); this.saving = false; }
    });
  }

  hasError(f: string): boolean { const c = this.form.get(f); return !!(c && c.invalid && c.touched); }
}
