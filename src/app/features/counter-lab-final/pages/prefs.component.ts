import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-counter-prefs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      @for (by of store.availableCountByValues; track $index) {
        <button
          [disabled]="store.countBy() === by"
          (click)="store.setCountBy(by)"
          class="btn join-item"
        >
          {{ by }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
