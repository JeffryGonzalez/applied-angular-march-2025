import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RollCounterComponent } from "../components/counter";
import { DiceStore } from '../services/dice.store';

@Component({
  selector: 'app-lab-ui-a',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RollCounterComponent],
  template: `

<div class="">
  <h1>UI Page</h1>

  <div class="mt-5">
    <button (click)="store.roll()" class="btn btn-secondary">Roll</button>
      <div class="flex gap-2">
        <p>You rolled a </p>
        <div class="badge badge-secondary">{{store.current()}}</div>
      </div>
  </div>

  <div>
  </div>

  <app-roll-counter-page />
  `,
  styles: ``
})
export class LabUiAComponent {
  store = inject(DiceStore);

}
