import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ClockComponent } from './components/clock/clock.component';

@NgModule({
  declarations: [
    ToastComponent,
    ConfirmDialogComponent,
    ThemeToggleComponent,
    ClockComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ToastComponent,
    ConfirmDialogComponent,
    ThemeToggleComponent,
    ClockComponent
  ]
})
export class SharedModule {}
