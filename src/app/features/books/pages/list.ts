import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksDataService } from '../services/books-data';
import { tap } from 'rxjs';
import { StatsComponent } from './stats';
import { BookApiEntity } from '../models/BookApiEntity';

@Component({
  selector: 'app-books-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatsComponent],
  providers: [BooksDataService],
  template: `
    <p>Book list</p>

    <div class="drawer drawer-end">
      <input id="stats-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="stats-drawer" class="drawer-button btn btn-primary"
          >Open stats drawer</label
        >
      </div>
      <div class="drawer-side">
        <label
          for="stats-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <app-book-stats [books]="books()!" />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-pin-rows">
        <thead>
          <tr>
            <td>ID</td>
            <td>Year</td>
            <td>Title</td>
            <td>Author</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          @for (book of books(); track $index) {
            <tr class="hover:bg-base-300">
              <td>{{ book.id }}</td>
              <td>{{ displayYear(book.year) }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  apiService = inject(BooksDataService);
  books = toSignal<BookApiEntity[]>(
    this.apiService.getBooks().pipe(tap((stuff) => console.log(stuff))),
  );

  displayYear(year: number): string {
    if (year < 0) {
      return `${-year} BC`;
    }

    return year.toString();
  }
}
