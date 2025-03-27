import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LinksStore } from '../services/links-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-links-reading-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: `
    <p>Reading List</p>

    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="list-row">
        <div>Title</div>
        <div>Note</div>
        <div>Added At</div>
      </li>
      @if (store.readingList().length !== 0) {
        @for (item of store.readingList(); track item?.id) {
          <li class="list-row">
            <div>
              <div class="font-bold text-xl">{{ item?.title }}</div>
            </div>
            <div>
              <div class="font-mono">{{ item?.note }}</div>
            </div>
            <div>
              <div>{{ item?.addedAt | date: 'short' }}</div>
            </div>
          </li>
        } @empty {
          <li class="list-row">
            <div>
              <div>No items in reading list</div>
            </div>
          </li>
        }
      }
    </ul>
  `,
  styles: ``,
})
export class ReadingListComponent {
  store = inject(LinksStore);
}
