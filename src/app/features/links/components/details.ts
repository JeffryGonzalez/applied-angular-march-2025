import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { LinksStore } from '../services/links-store';

@Component({
  selector: 'app-links-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <dialog #myModal class="modal">
      @let link = store.getActiveLink();
      @if (link) {
        <div class="modal-box">
          <h3 class="text-lg font-bold">{{ store.getActiveLink().title }}</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <p>{{ id() }}</p>
          <div class="modal-action">
            <form method="dialog" (submit)="close()">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      }
    </dialog>
  `,
  styles: ``,
})
export class DetailsComponent implements OnInit {
  store = inject(LinksStore);
  id = input.required<string>();
  modal = viewChild<ElementRef<HTMLDialogElement>>('myModal');
  ngOnInit(): void {
    this.modal()?.nativeElement.showModal();
    this.store.setActiveLink(this.id());
  }

  #location = inject(Location);
  close() {
    this.modal()?.nativeElement.close();
    this.#location.back();
  }
}
