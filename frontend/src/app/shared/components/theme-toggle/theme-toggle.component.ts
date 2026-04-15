import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="toggle-btn" (click)="themeService.toggle()" [title]="(themeService.isDark$ | async) ? 'Cambiar a modo día' : 'Cambiar a modo oscuro'">
      <ng-container *ngIf="themeService.isDark$ | async; else lightIcon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        </svg>
        Modo día
      </ng-container>
      <ng-template #lightIcon>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
        Modo oscuro
      </ng-template>
    </button>
  `,
  styles: [`
    .toggle-btn {
      display: flex; align-items: center; gap: 6px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 20px;
      padding: 5px 12px;
      color: rgba(255,255,255,0.8);
      font-size: 12px; font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--font);
      &:hover { border-color: rgba(255,255,255,0.6); color: #fff; }
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
}
