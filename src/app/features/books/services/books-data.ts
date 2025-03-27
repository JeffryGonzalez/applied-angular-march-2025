import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiEntity } from '../models/BookApiEntity';

export class BooksDataService {
  private client = inject(HttpClient);

  getBooks(): Observable<BookApiEntity[]> {
    return this.client.get<BookApiEntity[]>('/api/books');
  }
}
