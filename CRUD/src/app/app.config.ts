import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

import { jwtInterceptor } from './interceptors/jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.none',
                cssLayer: {
                    name: 'primeng',
                    order: 'theme, base, primeng'
                }
            }
        }
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // provider blindando todas as requisições HTTP do app com o Token
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};
