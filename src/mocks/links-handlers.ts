import { ApiLink } from '../app/features/links/types';
import { http, HttpResponse, delay } from 'msw';
const fakeLinks: ApiLink[] = [
  {
    id: '1',
    title: 'Applied Angular - Hypertheory',
    url: 'https://applied-angular.hypertheory.com/',
    description: 'Training Materials for the Applied Angular Class',
    tags: ['angular', 'training', 'hypertheory'],
  },
  {
    id: '2',
    title: 'Angular Docs',
    url: 'https://angular.io/docs',
    description: 'The official Angular documentation',
    tags: ['angular', 'docs'],
  },
  {
    id: '3',
    title: 'NGRX Docs',
    url: 'https://ngrx.io/docs',
    description: 'The official NGRX documentation',
  },
  {
    id: '4',
    title: 'Angular Material',
    url: 'https://material.angular.io/',
    description: 'The official Angular Material documentation',
    tags: ['angular', 'material'],
  },
  {
    id: '5',
    title: 'Angular CLI',
    url: 'https://cli.angular.io/',
    description: 'The official Angular CLI documentation',
    tags: ['angular', 'cli'],
  },
  {
    id: '6',
    title: 'Angular Universal',
    url: 'https://angular.io/guide/universal',
    description: 'The official Angular Universal documentation',
    tags: ['angular', 'universal'],
  },
];

export const LinkHandlers = [
  http.get('https://some-service.com/api/links', async () => {
    await delay(1500);
    return HttpResponse.json(fakeLinks);
  }),
];
