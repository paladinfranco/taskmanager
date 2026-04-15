import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="overlay" *ngIf="visible" (click)="onCancel()">
      <div class="dialog card" (click)="$event.stopPropagation()">
        <div class="dialog-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <h3>{{ title }}</h3>
        </div>
        <p class="dialog-msg">{{ message }}</p>
        <div class="dialog-actions">
          <button class="btn" (click)="onCancel()">Cancelar</button>
          <button class="btn btn-danger" (click)="onConfirm()">Sí, eliminar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    }
    .dialog {
      padding: 24px; width: 100%; max-width: 380px;
      margin: 16px;
    }
    .dialog-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
      h3 { font-size: 15px; font-weight: 600; color: #dc2626; }
    }
    .dialog-msg { font-size: 13px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.5; }
    .dialog-actions { display: flex; gap: 8px; justify-content: flex-end; }
  `]
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = '¿Confirmar eliminación?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void { this.confirmed.emit(); }
  onCancel(): void  { this.cancelled.emit(); }
}
