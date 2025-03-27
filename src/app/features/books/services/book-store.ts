import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

const SORT_OPTIONS = ['title', 'author', 'year'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

type SortState = {
  sortBy: SortOption;
};

export const BookStore = signalStore(
  withState<SortState>({
    sortBy: 'title',
  }),
  withProps(() => ({
    availableSortOptions: SORT_OPTIONS,
  })),
  withMethods((store) => ({
    setSortBy: (sortBy: SortOption) => {
      patchState(store, { sortBy });
    },
  })),
  withHooks({
    onInit(store) {
      const savedSort = localStorage.getItem(
        'sort-preference',
      ) as SortOption | null;
      if (savedSort && SORT_OPTIONS.includes(savedSort)) {
        patchState(store, { sortBy: savedSort });
      }

      effect(() => {
        localStorage.setItem('sort-preference', store.sortBy());
      });
    },
  }),
);
