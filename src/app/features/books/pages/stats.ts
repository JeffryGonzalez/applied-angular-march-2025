import { NgIf } from '@angular/common';
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
  selector: 'app-book-stats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  template: `
    <h2>Book Statistics</h2>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngIf="books.value() as bookList">
            <tr>
              <td>Total Number of Books</td>
              <td>{{ bookList.length }}</td>
            </tr>
            <tr>
              <td>Earliest Published Book</td>
              <td>
                {{ calculateEarliestPublishedDate(bookList) }}
                {{ calculateEarliestPublishedDate(bookList) < 0 ? 'BC' : 'AD' }}
              </td>
            </tr>
            <tr>
              <td>Most Recent Published Book</td>
              <td>
                {{ calculateLatestPublishedDate(bookList) }}
                {{ calculateLatestPublishedDate(bookList) < 0 ? 'BC' : 'AD' }}
              </td>
            </tr>
            <tr>
              <td>Average Pages per Book</td>
              <td>{{ calculateAveragePages(bookList) }}</td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  books = resource<BookApiResponse, unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });

  calculateEarliestPublishedDate(bookList: BookApiEntity[]): number {
    if (!bookList || bookList.length === 0) {
      return 0;
    }
    const earliestPublishedDate = bookList.map((book) => book.year);
    return Math.min(...earliestPublishedDate);
  }

  calculateLatestPublishedDate(bookList: BookApiEntity[]): number {
    if (!bookList || bookList.length === 0) {
      return 0;
    }
    const latestPublishedDate = bookList.map((book) => book.year);
    return Math.max(...latestPublishedDate);
  }

  calculateAveragePages(bookList: BookApiEntity[]): number {
    if (!bookList || bookList.length === 0) {
      return 0;
    }
    const totalPages = bookList.reduce((sum, book) => sum + book.pages, 0);
    return totalPages / bookList.length;
  }
}
