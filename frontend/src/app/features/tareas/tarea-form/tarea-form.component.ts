import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from '../../../core/services/tarea.service';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.scss']
})
export class TareaFormComponent implements OnInit {
  @Input() usuarioId!: string;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  saving = false;

  constructor(private fb: FormBuilder, private tareaService: TareaService, private toast: ToastService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo:      ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      descripcion: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.tareaService.create({ ...this.form.value, usuarioId: this.usuarioId }).subscribe({
      next: () => { this.toast.show('Tarea creada', 'success'); this.saving = false; this.saved.emit(); },
      error: (err) => { this.toast.show(err.message, 'error'); this.saving = false; }
    });
  }

  hasError(f: string): boolean { const c = this.form.get(f); return !!(c && c.invalid && c.touched); }
}
