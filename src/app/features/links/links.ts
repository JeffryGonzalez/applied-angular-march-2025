import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SectionNavComponent } from '../../../shared/components/section-nav/section-nav';
import { LinksDataService } from './services/links-data';
import { LinksStore } from './services/links-store';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LinksDataService, LinksStore],
  imports: [SectionNavComponent],
  template: `
    <app-section-nav
      sectionName="Developer Resources"
      [links]="[{ href: 'list', label: 'List' }]"
    >
    </app-section-nav>
  `,
  styles: ``,
})
export class LinksComponent {
  store = inject(LinksStore);
}
