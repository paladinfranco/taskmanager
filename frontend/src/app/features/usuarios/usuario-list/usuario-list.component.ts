import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUsuario: Usuario | null = null;
  showUsuarioForm = false;
  editingUsuario: Usuario | null = null;
  confirmDelete = false;
  usuarioToDelete: Usuario | null = null;
  activeTab: 'tareas' | 'historial' = 'tareas';
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        if (data.length > 0 && !this.selectedUsuario) {
          this.selectedUsuario = data[0];
        } else if (this.selectedUsuario) {
          this.selectedUsuario = data.find(u => u.id === this.selectedUsuario!.id) || data[0];
        }
        this.loading = false;
      },
      error: (err) => {
        this.toast.show(err.message, 'error');
        this.loading = false;
      }
    });
  }

  selectUsuario(u: Usuario): void {
    this.selectedUsuario = u;
    this.activeTab = 'tareas';
  }

  openCreate(): void {
    this.editingUsuario = null;
    this.showUsuarioForm = true;
  }

  openEdit(u: Usuario): void {
    this.editingUsuario = u;
    this.showUsuarioForm = true;
  }

  onFormSaved(): void {
    this.showUsuarioForm = false;
    this.loadUsuarios();
  }

  onFormCancelled(): void {
    this.showUsuarioForm = false;
  }

  askDelete(u: Usuario): void {
    this.usuarioToDelete = u;
    this.confirmDelete = true;
  }

  doDelete(): void {
    if (!this.usuarioToDelete) return;
    this.usuarioService.delete(this.usuarioToDelete.id).subscribe({
      next: () => {
        this.toast.show('Usuario eliminado correctamente', 'success');
        this.confirmDelete = false;
        this.usuarioToDelete = null;
        this.selectedUsuario = null;
        this.loadUsuarios();
      },
      error: (err) => {
        this.toast.show(err.message, 'error');
        this.confirmDelete = false;
      }
    });
  }

  getInitials(nombre: string): string {
    return nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }
}
