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
    <p>List of Books</p>
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
    >
      <table class="table w-full">
        <thead>
          <tr>
            <th
              class="clickable-header"
              (click)="sortColumn = 'id'; sortAscending = !sortAscending"
            >
              ID
            </th>
            <th
              class="clickable-header"
              (click)="sortColumn = 'title'; sortAscending = !sortAscending"
            >
              Title
            </th>
            <th
              class="clickable-header"
              (click)="sortColumn = 'author'; sortAscending = !sortAscending"
            >
              Author
            </th>
            <th
              class="clickable-header"
              (click)="sortColumn = 'year'; sortAscending = !sortAscending"
            >
              Year
            </th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngIf="books.value() as bookList">
            <tr
              *ngFor="
                let book of sortBooks(bookList, sortColumn, sortAscending)
              "
            >
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

  sortColumn: keyof BookApiEntity = 'title';
  sortAscending = true;

  sortBooks(
    bookList: BookApiEntity[],
    column: keyof BookApiEntity,
    ascending: boolean,
  ): BookApiEntity[] {
    return [...bookList].sort((first, second) => {
      const firstComparison = first[column];
      const secondComparison = second[column];

      // Convert string IDs to numbers for for proper numerical sorting
      if (column === 'id') {
        const firstNumericalComparison = parseInt(
          firstComparison as string,
          10,
        );
        const secondNumericalComparison = parseInt(
          secondComparison as string,
          10,
        );
        return ascending
          ? firstNumericalComparison - secondNumericalComparison
          : secondNumericalComparison - firstNumericalComparison;
      }

      if (
        typeof firstComparison === 'string' &&
        typeof secondComparison === 'string'
      ) {
        return ascending
          ? firstComparison.localeCompare(secondComparison)
          : secondComparison.localeCompare(firstComparison);
      }

      if (
        typeof firstComparison === 'number' &&
        typeof secondComparison === 'number'
      ) {
        return ascending
          ? firstComparison - secondComparison
          : secondComparison - firstComparison;
      }

      return 0;
    });
  }
}
