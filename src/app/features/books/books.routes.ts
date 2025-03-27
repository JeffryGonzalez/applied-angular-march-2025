import { Routes } from '@angular/router';
import { BooksComponent } from './books';
import { ListComponent } from './pages/list';
import { BookStatComponent } from './pages/stat';
import { BookPrefComponent } from './pages/pref';
export const BOOK_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stat',
        component: BookStatComponent,
      },
      {
        path: 'pref',
        component: BookPrefComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
