import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
} from '@angular/core';
import { BookApiResponse } from './list';

@Component({
  selector: 'app-book-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="p-6 bg-base-content rounded-lg shadow-md">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-center"
    >
      <div class="stat card bg-base-300">
        <p class=" text-2xl font-semibold">Total Books</p>
        <p class="text-4xl font-bold text-primary mt-5">{{ totalBooks() }}</p>
      </div>
      <div class="stat card bg-base-300">
        <p class="text-2xl font-semibold">Earliest Year</p>
        <p class="text-4xl font-bold text-secondary mt-5">
          {{ earliestYear() }}
        </p>
      </div>
      <div class="stat card bg-base-300">
        <p class="text-2xl font-semibold">Most Recent Year</p>
        <p class="text-4xl font-bold text-accent mt-5">{{ latestYear() }}</p>
      </div>
      <div class="stat card bg-base-300">
        <p class="text-2xl font-semibold">Avg. Pages</p>
        <p class="text-4xl font-bold text-info mt-5">
          {{ averagePages().toFixed(1) }}
        </p>
      </div>
    </div>
  </div>`,
  styles: ``,
})
export class BookStatsComponent {
  books = signal<BookApiResponse>([]);

  constructor() {
    this.fetchBooks();
  }

  fetchBooks(): void {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data: BookApiResponse) => {
        this.books.set(data);
      });
  }

  totalBooks = computed(() => this.books().length);

  earliestYear = computed(() =>
    this.books().reduce((min, book) => Math.min(min, book.year), Infinity),
  );

  latestYear = computed(() =>
    this.books().reduce((max, book) => Math.max(max, book.year), -Infinity),
  );

  averagePages = computed(() => {
    const totalPages = this.books().reduce((sum, book) => sum + book.pages, 0);
    return this.books().length ? totalPages / this.books().length : 0;
  });
}
