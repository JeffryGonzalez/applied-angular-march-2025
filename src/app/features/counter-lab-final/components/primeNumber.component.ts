import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-prime-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="alert alert-info">{{ store.primeNumber() }}</div> `,
  styles: ``,
})
export class PrimeNumberComponent {
  store = inject(CounterStore);
}
