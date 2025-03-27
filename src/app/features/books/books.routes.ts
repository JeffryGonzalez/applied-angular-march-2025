import { Routes } from '@angular/router';
import { BooksComponent } from './books';
import { ListComponent } from './pages/list';
import { BookStatsComponent } from './pages/book-stats';
import { DetailsComponent } from './pages/details';
export const BOOK_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
        children: [
          {
            path: ':id',
            component: DetailsComponent,
          },
        ],
      },
      {
        path: 'stats',
        component: BookStatsComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
