import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';
import { FizzbuzzComponent } from '../components/fizzbuzz.component';
import { PrimeNumberComponent } from '../components/primeNumber.component';

@Component({
  selector: 'app-ui-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FizzbuzzComponent, PrimeNumberComponent],
  template: `
    <div>
      <button
        [disabled]="store.decrementShouldBeDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ store.currentNumber() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
    </div>

    <app-fizzbuzz />

    <app-prime-number />
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
