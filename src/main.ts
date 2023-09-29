import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module'
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/shared/interceptors/auth.interceptor';

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));


bootstrapApplication(AppComponent, {
    providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, BrowserAnimationsModule),
    provideAnimations()
]
  })
  .catch(err => console.error(err));