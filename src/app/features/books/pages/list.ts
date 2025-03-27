import { NgIf, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

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
  imports: [NgIf, NgFor],
  template: `
    <p>Book List</p>
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
    >
      <table class="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngIf="books.value() as bookList">
            <tr *ngFor="let book of sortedBookList(bookList)">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                {{ book.year }}
                {{ book.year < 0 ? 'BC' : 'AD' }}
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  books = resource<BookApiResponse, unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });

  sortedBookList(bookList: BookApiEntity[]): BookApiEntity[] {
    return bookList.sort((a, b) => a.title.localeCompare(b.title));
  }
}
