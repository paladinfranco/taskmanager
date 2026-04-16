import { Injectable } from '@angular/core';

const COLORS = [
  { bg: '#dbeafe', text: '#1d4ed8' },
  { bg: '#dcfce7', text: '#15803d' },
  { bg: '#fef3c7', text: '#b45309' },
  { bg: '#ede9fe', text: '#6d28d9' },
  { bg: '#fce7f3', text: '#be185d' },
  { bg: '#cffafe', text: '#0e7490' },
  { bg: '#fee2e2', text: '#b91c1c' },
  { bg: '#f3e8ff', text: '#7c3aed' },
  { bg: '#ecfdf5', text: '#065f46' },
  { bg: '#fff7ed', text: '#c2410c' },
];

@Injectable({ providedIn: 'root' })
export class AvatarColorService {

  getColor(name: string): { bg: string; text: string } {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
  }

  getStyle(name: string): { [key: string]: string } {
    const c = this.getColor(name);
    return { 'background-color': c.bg, 'color': c.text };
  }
}
