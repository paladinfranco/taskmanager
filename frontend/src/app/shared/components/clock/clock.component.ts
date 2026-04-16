import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `
    <div class="clock-wrap">
      <div class="clock-time">{{ time }}</div>
      <div class="clock-date">{{ date }}</div>
    </div>
  `,
  styles: [`
    .clock-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 10px;
    }
    .clock-time {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 0.05em;
      line-height: 1.1;
    }
    .clock-date {
      font-size: 10px;
      color: rgba(255,255,255,0.55);
      text-transform: capitalize;
      line-height: 1.2;
    }
  `]
})
export class ClockComponent implements OnInit, OnDestroy {
  time = '';
  date = '';
  private interval!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private update(): void {
    const now = new Date();
    this.time = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.date = now.toLocaleDateString('es-EC', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  }
}
