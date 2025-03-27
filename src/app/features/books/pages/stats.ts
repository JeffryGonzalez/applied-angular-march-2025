import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { BookApiEntity, BookApiResponse } from '../models/BookApiEntity';
import { StatsItemComponent } from './stats-item';

@Component({
  selector: 'app-book-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatsItemComponent],
  template: `
    <h2>STATS</h2>
    <div>
      <app-stats-item
        title="Total Books"
        [value]="totalBooks()"
        description="The total number of books returned by API"
      />
    </div>

    <div>
      <app-stats-item
        title="Earliest Published book"
        [value]="displayYear(earliestPublishedBook().year)"
        description="The earliest published book is actually: {{
          earliestPublishedBook().title
        }}"
      />
    </div>

    <div>
      <app-stats-item
        title="Latest Published book"
        [value]="displayYear(latestPublishedBook().year)"
        description="The latest published book is actually: {{
          latestPublishedBook().title
        }}"
      />
    </div>

    <div>
      <app-stats-item
        title="Average pages"
        [value]="averagePages()"
        description="This is a summation of all pages in all books, divided by the number of books"
      />
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  books = input.required<BookApiResponse>();

  totalBooks = computed(() => this.books().length);
  averagePages = computed(
    () =>
      this.books().reduce((sum, item) => sum + item.pages, 0) /
      this.totalBooks(),
  );

  earliestPublishedBook = computed(() =>
    this.books().reduce((earliest, current) => {
      return current.year < earliest.year ? current : earliest;
    }),
  );

  latestPublishedBook = computed(() =>
    this.books().reduce((latest, current) => {
      return current.year > latest.year ? current : latest;
    }),
  );

  // todo:  duplicate code here!
  displayYear(year: number): string {
    if (year < 0) {
      return `${-year} BC`;
    }

    return year.toString();
  }
}
