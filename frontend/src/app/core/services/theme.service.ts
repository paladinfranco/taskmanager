import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private darkMode$ = new BehaviorSubject<boolean>(this.loadPreference());

  isDark$ = this.darkMode$.asObservable();

  toggle(): void {
    const next = !this.darkMode$.value;
    this.darkMode$.next(next);
    localStorage.setItem('tm-theme', next ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', next);
  }

  init(): void {
    document.body.classList.toggle('dark-mode', this.darkMode$.value);
  }

  get isDark(): boolean {
    return this.darkMode$.value;
  }

  private loadPreference(): boolean {
    return localStorage.getItem('tm-theme') === 'dark';
  }
}
