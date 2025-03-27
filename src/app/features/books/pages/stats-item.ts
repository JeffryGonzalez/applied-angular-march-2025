import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-stats-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="stats shadow-amber-100">
      <div class="stat">
        <div class="stat-title">{{ title() }}</div>
        <div class="stat-value">{{ value() }}</div>
        <div class="stat-desc">{{ description() }}</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class StatsItemComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  description = input.required<string>();
}
