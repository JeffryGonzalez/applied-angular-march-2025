import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CounterStore } from './services/counter-store';

@Component({
  selector: 'app-counter-final',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [CounterStore],
  template: `
    <div>Final Counter & Prime Number</div>
    <div>
      <a class="link" routerLink="UI">UI </a>
    </div>
    <div>
      <a class="link" routerLink="prefs">Prefs </a>
    </div>
    <div>
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class CounterComponent {}
