import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DiceStore } from '../services/dice.store';

@Component({
  selector: 'app-roll-counter-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="mt-5 ml-5">
      <h1>Counter Page</h1>

      <div>
        @for (roll of store.rollCounts(); track $index) {
          <div class="flex">
            <h1>{{ $index + 1 }}:</h1>
            @for (n of range(roll); track $index) {
              🎲
            }
            <!-- <p>{{ roll }}</p> -->
          </div>
        }
      </div>

      <!-- <div class="">
        <div class="flex">
          <h1>1:</h1>
          <p>{{ this.store.rollCounts()[0] }}</p>
        </div>

        <div class="flex">
          <h1>2:</h1>
          <p>{{ this.store.rollCounts()[1] }}</p>
        </div>

        <div class="flex">
          <h1>3:</h1>
          <p>{{ this.store.rollCounts()[2] }}</p>
        </div>

        <div class="flex">
          <h1>4:</h1>
          <p>{{ this.store.rollCounts()[3] }}</p>
        </div>

        <div class="flex">
          <h1>5:</h1>
          <p>{{ this.store.rollCounts()[4] }}</p>
        </div>

        <div class="flex">
          <h1>6:</h1>
          <p>{{ this.store.rollCounts()[5] }}</p>
        </div>
      </div> -->
    </div>
  `,
  styles: ``,
})
export class RollCounterComponent {
  store = inject(DiceStore);
  diceCount: number[] = [0, 0, 0, 0, 0, 0];

  increment(roll: number) {
    this.diceCount[roll]++;
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
