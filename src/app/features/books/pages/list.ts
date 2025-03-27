import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksDataService } from '../services/books-data';
import { tap } from 'rxjs';

@Component({
  selector: 'app-books-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [BooksDataService],
  template: `
    <p>Book list</p>
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
              <td>{{ book.year }}</td>
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
  books = toSignal(
    this.apiService.getBooks().pipe(tap((stuff) => console.log(stuff))),
  );

  // books = resource<BookApiResponse, unknown>({
  //   loader: () => fetch('/api/books').then((res) => res.json()),
  // });
}
