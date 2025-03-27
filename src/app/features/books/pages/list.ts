import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/book-store';
import { Book } from '../type';

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
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of books(); track book) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(BooksStore);
  books = this.store.sortedBooks;
  orderBy = this.store.orderBy();
}
