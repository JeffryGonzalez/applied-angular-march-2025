import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Book, Books } from '../type';

export class BookDataService {
  private client = inject(HttpClient);

  loadBooks() {
    return this.client.get<Books>('/api/books');
  }

  loadBook(id: string) {
    return this.client.get<Book>(`/api/books/${id}`);
  }
}
