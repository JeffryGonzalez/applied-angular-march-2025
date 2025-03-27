import { CommonModule, JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  inject,
  computed,
} from '@angular/core';
import { PrefsComponent } from './prefs';
import { BookStore } from '../services/book-store';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

export type BookApiEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

export type BookApiResponse = BookApiEntity[];
@Component({
  selector: 'app-books-list',
  standalone: true,

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PrefsComponent, RouterLink],
  template: `
    <app-prefs />
    <div class="p-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          *ngFor="let book of sortedBooks()"
          class="card bg-base-300 border border-base-content shadow-xl p-4"
        >
          <div class="flex items-center gap-4">
            <div class="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 2v20l6-3.5L18 22V2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ book.title }}</h3>
              <p class="text-sm text-gray-500">
                by {{ book.author }} in {{ book.year }}
              </p>
              <p class="text-xs text-gray-400">ID: {{ book.id }}</p>
            </div>
          </div>
          <div class="card-actions justify-end">
            <a [routerLink]="[book.id]" class="btn btn-primary">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(BookStore);
  router = inject(Router);

  books = resource<BookApiResponse, unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });

  sortedBooks = computed(() => {
    const books = this.books.value() || [];
    const sortBy = this.store.sortBy() as keyof BookApiEntity;

    return [...books].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return String(aValue).localeCompare(String(bValue));
    });
  });

  viewBookDetails(bookId: string) {
    this.router.navigate(['/details', bookId]);
  }
}
