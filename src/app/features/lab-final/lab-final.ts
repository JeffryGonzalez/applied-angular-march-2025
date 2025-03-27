import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lab-final',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
  <div class="mb-4 hero bg-base-200" >Lab Final</div>

  <div class="">
    <button routerLink="uiA" class="btn btn-neutral">Main Page</button>
  </div>

  <div class="ml-4">
    <router-outlet></router-outlet>
  </div>


  `,
  styles: ``
})
export class LabFinalComponent {

}
