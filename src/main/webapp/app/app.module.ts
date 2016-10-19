import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Custom Components
import { AppCmp } from './app.cmp'; // Main cmp
import { NavModule } from './common/nav.module';

import { ROUTING } from './app.routes';

import { UtilityModule } from './shared/modules/utility.module';

import { AppService } from './shared/services/app.service';

import {RouteAccessGuard}  from './test-routes/routesAccessGuard.service';

@NgModule({
    imports: [
        BrowserModule,
        NavModule,
        ROUTING,
        UtilityModule
    ],
    declarations: [
        AppCmp
    ],
    bootstrap: [AppCmp],
    providers: [
        RouteAccessGuard,
        AppService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ]
})

export class AppModule { }