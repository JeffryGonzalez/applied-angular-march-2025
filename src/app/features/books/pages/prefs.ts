import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookStore } from '../services/book-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="p-4">
      <h2 class="text-lg font-bold">Sort Books By:</h2>
      <div class="join">
        @for (option of store.availableSortOptions; track $index) {
          <button
            [disabled]="store.sortBy() === option"
            (click)="store.setSortBy(option)"
            class="btn join-item"
          >
            {{ option }}
          </button>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(BookStore);
}
