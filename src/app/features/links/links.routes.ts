import { Routes } from '@angular/router';
import { LinksComponent } from './links';
import { ListComponent } from './components/list';
import { DetailsComponent } from './components/details';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: LinksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
        children: [{ path: ':id', component: DetailsComponent }],
      },
      { path: '**', redirectTo: 'list' },
    ],
  },
];
