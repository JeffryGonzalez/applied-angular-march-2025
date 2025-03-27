import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionNavComponent } from '../../../shared/components/section-nav/section-nav';
import { NavBarItem } from '../../components/nav-bar/types';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionNavComponent],
  template: `
    <app-section-nav sectionName="Books" [links]="links()"> </app-section-nav>
  `,
  styles: ``,
})
export class BooksComponent {
  links = signal<NavBarItem[]>([{ label: 'Book List', href: 'list' }]);
}
