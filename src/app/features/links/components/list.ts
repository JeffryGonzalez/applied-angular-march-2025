import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CardComponent } from '@app-shared/components';
import { LinksDataService } from '../services/links-data';
import { LinksStore } from '../services/links-store';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    @if (listOfLinks()) {
      <router-outlet />
      <div class="join">
        @if (selectedTag() !== null) {
          <a
            [routerLink]="[]"
            [queryParams]="{}"
            class="btn  join-item btn-error"
            >See All ({{ filteredLinks().length }}/{{
              store.entities().length
            }})</a
          >
        }
        @for (tag of uniqueTags(); track tag) {
          @if (tag === this.selectedTag() || selectedTag() === null) {
            <a
              [routerLinkActive]="['btn-success']"
              [routerLink]="[]"
              [queryParams]="{ tag }"
              class="btn  join-item"
              >{{ tag }}</a
            >
          }
        }
      </div>
      <div class="w-full h-8">
        @if (store.isFetching()) {
          <progress class="progress progress-info opacity-50"></progress>
        }
      </div>
      <div class="divider"></div>

      <div class="flex flex-row flex-wrap gap-4 justify-center pt-4">
        @for (link of filteredLinks(); track link.id) {
          <app-card [title]="link.title">
            <p class="text-accent">{{ link.description }}</p>
            <div class="flex flex-row gap-2">
              @for (tag of link.tags; track tag) {
                <a
                  [routerLink]="[]"
                  [queryParams]="{ tag }"
                  class="badge badge-outline"
                  [class.badge-success]="tag === selectedTag()"
                  [class.badge-info]="tag !== selectedTag()"
                  >{{ tag }}</a
                >
              }
            </div>
            <div class="flex flex-row flex-wrap gap-2">
              <a
                [routerLink]="[link.id]"
                [routerLinkActive]="['btn-success']"
                class="btn btn-sm btn-outline btn-accent"
                >Details</a
              >

              <a
                [href]="link.url"
                [title]="link.url"
                target="_blank"
                class="btn btn-sm btn-link "
              >
                <div class="flex flex-col">
                  Visit
                  <div class="text-xs opacity-60">{{ link.url }}</div>
                </div>
              </a>
            </div>
          </app-card>
        } @empty {
          <p>Sorry, you have no links!</p>
        }
      </div>
    } @else {
      <p>Nothing yet..</p>
    }
  `,
  styles: ``,
})
export class ListComponent {
  //   links = signal<ApiLinks>([]);
  store = inject(LinksStore);
  service = inject(LinksDataService);

  listOfLinks = toSignal(this.service.getLinks());

  uniqueTags = computed(() => {
    const allLinks = this.listOfLinks();
    if (!allLinks) return [];
    const tags = allLinks.flatMap((link) => link.tags).filter(Boolean);
    return Array.from(new Set(tags));
  });

  filteredLinks = computed(() => {
    const allLinks = this.listOfLinks();
    const selectedTag = this.selectedTag();
    if (!allLinks) return [];
    if (!selectedTag) return allLinks;
    return allLinks
      .filter((link) => link.tags)
      .filter((link) => link.tags?.includes(selectedTag));
  });

  selectedTag = signal<string | null>(null);
  #ar = inject(ActivatedRoute);

  constructor() {
    this.#ar.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.selectedTag.set(params['tag'] || null);
    });
  }
}
