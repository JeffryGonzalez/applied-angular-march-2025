import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/book-store';

@Component({
  selector: 'app-book-pref',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      @for (orderBy of store.availableOrderByList; track orderBy) {
        <button
          [disabled]="store.orderBy() === orderBy"
          class="join-item btn btn-primary"
          (click)="store.setOrderBy(orderBy)"
        >
          {{ orderBy }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class BookPrefComponent {
  store = inject(BooksStore);
}
