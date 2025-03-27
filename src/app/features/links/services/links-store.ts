import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { interval, switchMap, tap } from 'rxjs';
import { ApiLink } from '../types';
import { LinksDataService } from './links-data';

export const LinksStore = signalStore(
  withState({
    activeLink: null as string | null,
    isFetching: false,
  }),
  withEntities<ApiLink>(),
  withMethods((store) => {
    const service = inject(LinksDataService);
    return {
      _load: rxMethod<void>(
        switchMap(() => {
          patchState(store, { isFetching: true });
          return service
            .getLinks()
            .pipe(
              tap((links) =>
                patchState(store, setEntities(links), { isFetching: false }),
              ),
            );
        }),
      ),
      setActiveLink: (id: string) => patchState(store, { activeLink: id }),
      clearActiveLink: () => patchState(store, { activeLink: null }),
    };
  }),
  withComputed((store) => {
    return {
      getActiveLink: computed(
        () => store.entityMap()[store.activeLink() ?? ''],
      ),
    };
  }),
  withHooks({
    onInit: (store) => {
      store._load();
      console.log('Store initialized');
      interval(5000)
        .pipe(
          takeUntilDestroyed(),
          tap(() => console.log('Interval triggered')),
          tap(() => store._load()),
        )
        .subscribe();
    },
    onDestroy: () => {
      console.log('Store destroyed');
    },
  }),
);
