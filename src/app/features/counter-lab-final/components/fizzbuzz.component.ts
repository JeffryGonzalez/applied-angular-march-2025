import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-fizzbuzz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      @switch (store.fizzBuzz()) {
        @case ('FizzBuzz') {
          <div class="alert alert-success">Fizz Buzz!</div>
        }
        @case ('Fizz') {
          <div class="alert alert-success">Fizz</div>
        }
        @case ('Buzz') {
          <div class="alert alert-success">Buzz</div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class FizzbuzzComponent {
  store = inject(CounterStore);
}
