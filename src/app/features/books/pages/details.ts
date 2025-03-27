import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  resource,
  effect,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStore } from '../services/book-store';
import { BookApiEntity, BookApiResponse } from './list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `<p>made it to details page</p>`,
  styles: ``,
})
export class DetailsComponent {
  route = inject(ActivatedRoute);
  store = inject(BookStore);
  book = signal<BookApiEntity | undefined>(undefined);

  books = resource<BookApiResponse, unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });

  constructor() {
    const bookId = this.route.snapshot.paramMap.get('id');
    console.log('made it to details page', bookId);
    effect(() => {
      const books = this.books.value();
      if (books) {
        this.book.set(books.find((book) => book.id === bookId));
      }
    });
  }

  goBack() {
    history.back();
  }
}
