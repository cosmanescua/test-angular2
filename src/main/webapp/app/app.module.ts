import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

// Custom Components
import { AppCmp } from './app.cmp'; // Main cmp
import { NavModule } from './common/nav.module';

import { UtilityModule } from './shared/modules/utility.module';

import { AuthService } from './shared/services/auth.service';

import { AppService } from './shared/services/app.service';
import { DTService } from './dtShared/dt.service';

import { DTHttpInterceptor } from './dtShared/dt.httpInterceptor';

import { AuthGuard } from './authGuard';
import { LoginAuthGuard } from './login/login.authGuard';
import { HomeAuthGuard } from './home/home.guard';

import { ROUTING } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        NavModule,
        ROUTING,
        UtilityModule,
    ],
    declarations: [
        AppCmp
    ],
    bootstrap: [AppCmp],
    providers: [
        AuthGuard,
        LoginAuthGuard,
        HomeAuthGuard,

        AuthService,
        AppService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                dtService: DTService) =>
                new DTHttpInterceptor(backend, defaultOptions, dtService),
            deps: [XHRBackend, RequestOptions, DTService]
        }
    ]
})

export class AppModule { }