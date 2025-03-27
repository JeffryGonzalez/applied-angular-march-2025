import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { CardComponent } from '../../../../shared/components/card';
import { BooksStore } from '../services/book-store';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-book-stat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
  template: `
    <app-card title="Book List Statistics">
      <span>Number of Books: {{ books().length }}</span>
      <span>Earliest Book Year: {{ earliestYear() }}</span>
      <span>Latest Book Year: {{ latestYear() }}</span>
      <span>Average Book Page No.: {{ totalValue() }}</span>
    </app-card>
  `,
  styles: ``,
})
export class BookStatComponent {
  store = inject(BooksStore);
  books = this.store.entities;

  earliestYear = computed(() => {
    const currentItems = this.books();
    if (currentItems.length === 0) {
      return undefined;
    }
    return currentItems.reduce(
      (min, item) => (item.year < min ? item.year : min),
      currentItems[0].year,
    );
  });

  latestYear = computed(() => {
    const currentItems = this.books();
    if (currentItems.length === 0) {
      return undefined;
    }
    return currentItems.reduce(
      (max, item) => Math.max(max, item.year),
      -Infinity,
    );
  });

  totalValue = computed(() => {
    return Math.floor(
      this.books().reduce((sum, item) => sum + item.pages, 0) /
        this.books().length,
    );
  });
}
