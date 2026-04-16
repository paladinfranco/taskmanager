import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  @Input() usuario: Usuario | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.usuario?.nombre || '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email:  [this.usuario?.email  || '', [Validators.required, Validators.email]],
      ciudad: [this.usuario?.ciudad || '', Validators.maxLength(80)],
      estado: [this.usuario?.estado || 'activo'],
      telefonos: this.fb.array(
        this.usuario?.telefonos?.map(t =>
          this.fb.group({ telefono: [t.telefono, [Validators.required, Validators.pattern('^09[0-9]{8}$')]], tipo: [t.tipo] })
        ) || []
      )
    });
  }

  get telefonos(): FormArray { return this.form.get('telefonos') as FormArray; }

  addTelefono(): void {
    this.telefonos.push(this.fb.group({ telefono: ['', [Validators.required, Validators.pattern('^09[0-9]{8}$')]], tipo: ['principal'] }));
  }

  removeTelefono(i: number): void { this.telefonos.removeAt(i); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const dto = this.form.value;
    const action = this.usuario
      ? this.usuarioService.update(this.usuario.id, dto)
      : this.usuarioService.create(dto);

    action.subscribe({
      next: () => {
        this.toast.show(this.usuario ? 'Usuario actualizado' : 'Usuario creado', 'success');
        this.saving = false;
        this.saved.emit();
      },
      error: (err) => {
        this.toast.show(err.message, 'error');
        this.saving = false;
      }
    });
  }

  soloNumeros(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  bloquearPaste(event: ClipboardEvent): void {
    const texto = event.clipboardData?.getData('text') || '';
    if (!/^[0-9]+$/.test(texto)) {
      event.preventDefault();
    }
  }

  hasError(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }
}
