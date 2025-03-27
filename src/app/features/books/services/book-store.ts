import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
  withProps,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Book } from '../type';
import { computed, inject } from '@angular/core';
import { BookDataService } from './book-data';
import { interval, switchMap, tap } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const orderByList = ['title', 'author', 'year'] as const;
type AvailableOrderBys = (typeof orderByList)[number];

export const BooksStore = signalStore(
  withEntities<Book>(),
  withProps(() => ({
    availableOrderByList: orderByList,
  })),
  withDevtools('books'),
  withState({
    selectedId: undefined as number | undefined,
    isFetching: false,
    orderBy: 'title' as AvailableOrderBys,
  }),
  withMethods((store) => {
    const service = inject(BookDataService);
    return {
      setSelectedId: (id: number) => patchState(store, { selectedId: id }),
      setOrderBy: (orderBy: AvailableOrderBys) =>
        patchState(store, { orderBy }),
      clearSelectedId: () => patchState(store, { selectedId: undefined }),
      loadBooks: rxMethod<void>(
        switchMap(() => {
          patchState(store, { isFetching: true });
          return service
            .loadBooks()
            .pipe(
              tap((books) =>
                patchState(store, setEntities(books), { isFetching: false }),
              ),
            );
        }),
      ),
    };
  }),
  withComputed((store) => {
    return {
      selectedBook: computed(() => {
        const id = store.selectedId();
        if (!id) return undefined;
        return store.entities().find((book) => book.id === id);
      }),
      sortedBooks: computed(() => {
        const orderBy = store.orderBy();
        const books = store.entities();
        if (orderBy != 'year') {
          return books.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
        } else {
          return books.sort((a, b) => a.year - b.year);
        }
      }),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('The BookStore has been initialized');
      store.loadBooks();

      interval(3000)
        .pipe(
          takeUntilDestroyed(),
          tap(() => store.loadBooks()),
        )
        .subscribe();
    },
    onDestroy() {
      console.log('The BookStore has been destroyed');
    },
  }),
);
