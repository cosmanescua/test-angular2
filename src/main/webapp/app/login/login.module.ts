import { NgModule } from '@angular/core';

import { DTService } from '../dtShared/dt.service';
import { LoginService } from '../login/login.service';

import { LoginCmp } from '../login/login.cmp';

import { ROUTING } from './login.routes';


import { UtilityModule } from '../shared/modules/utility.module';


import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule
    ],
    declarations: [
        LoginCmp
    ],
    providers: [
        LoginService,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                cookieService: CookieService,
                dtService: DTService) =>
                new DTHttpInterceptor(backend, defaultOptions, cookieService),
            deps: [XHRBackend, RequestOptions, CookieService]
        },
    ]
})
export class LoginModule { }
