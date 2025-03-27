import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiResponse } from '../models/BookApiEntity';
import { Observable } from 'rxjs';

export class BooksDataService {
  private client = inject(HttpClient);

  getBooks(): Observable<BookApiResponse> {
    return this.client.get<BookApiResponse>('/api/books');
  }
}
