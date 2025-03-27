import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SectionNavComponent } from '../../../shared/components/section-nav/section-nav';
import { BooksStore } from './services/book-store';
import { BookDataService } from './services/book-data';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BooksStore, BookDataService],
  imports: [SectionNavComponent],
  template: `
    <app-section-nav
      sectionName="Books"
      [links]="[
        { label: 'Book List', href: 'list' },
        { label: 'Book Statistics', href: 'stat' },
        { label: 'Preference', href: 'pref' },
      ]"
    >
    </app-section-nav>
  `,
  styles: ``,
})
export class BooksComponent {
  store = inject(BooksStore);
}
