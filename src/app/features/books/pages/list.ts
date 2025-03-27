import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';

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
  imports: [JsonPipe],
  template: `
    <p>Book list</p>
    <p>Total number of books: {{ totalBooks() }}</p>
    <p>Average number of pages: {{ averagePages() }}</p>
    <p>Author of the oldest book of the bunch: {{ earliestAuthor() }}</p>
    <p>
      Oldest book by a known author of the bunch: {{ earliestKnownAuthor() }}
    </p>
    <p>Author of the newest book of the bunch: {{ newestAuthor() }}</p>
    <p>
      THANK YOU JEFF FOR ANOTHER AMAZING CLASS. WILL SURELY LEAVE FEEDBACK ABOUT
      THE TYPESCRIPT AND STATE MANAGEMENT CLASSES I WOULD LIKE
    </p>
    <pre>    {{ books.value() | json }} </pre>
  `,
  styles: ``,
})
export class ListComponent {
  books = resource<BookApiResponse, unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });

  totalBooks = computed(() => {
    const booksData = this.books.value();
    return booksData ? booksData.length : 0;
  });

  averagePages = computed(() => {
    const booksData = this.books.value();
    if (!booksData || booksData.length === 0) return 0;

    const totalPages = booksData.reduce((sum, book) => sum + book.pages, 0);
    return totalPages / booksData.length;
  });

  earliestAuthor = computed(() => {
    const booksData = this.books.value();
    if (!booksData || booksData.length === 0)
      return 'That info is not available, sorry charlie';

    const earliestBook = booksData.reduce((earliest, current) => {
      return current.year < earliest.year ? current : earliest;
    });
    return earliestBook.author;
  });

  newestAuthor = computed(() => {
    const booksData = this.books.value();
    if (!booksData || booksData.length === 0)
      return 'That info is not available, sorry charlie';

    const newestBook = booksData.reduce((newest, current) => {
      return current.year > newest.year ? current : newest;
    });
    return newestBook.author;
  });

  earliestKnownAuthor = computed(() => {
    const booksData = this.books.value();
    if (!booksData || booksData.length === 0)
      return 'That info is not available, sorry charlie';

    const knownAuthorsBooks = booksData.filter(
      (book) => book.author && book.author.trim() !== '',
    );

    if (knownAuthorsBooks.length === 0) return 'N/A';

    const oldestBook = knownAuthorsBooks.reduce((oldest, current) => {
      return current.year < oldest.year ? current : oldest;
    });
    return oldestBook.title;
  });
}
