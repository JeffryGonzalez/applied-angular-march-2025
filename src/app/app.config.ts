import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { NameService } from './features/demos/services/name';
import { PrefsStore } from './services/prefs.store';
import { CustomPreloadingStrategy } from '@app-shared/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    CustomPreloadingStrategy,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(
      routes,
      withViewTransitions(),
      withPreloading(CustomPreloadingStrategy),
      withComponentInputBinding(),
    ),
    NameService, // this is the "global instance" and the only one, unless anyone else provides it.
    PrefsStore, // This does NOT create this, you can use a factory, but that's hard. See https://angular.dev/api/core/FactoryProvider
  ],
};
