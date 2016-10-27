import { NgModule } from '@angular/core';

import { DTService } from '../dtShared/dt.service';
import { LoginService } from '../login/login.service';

import { LoginCmp } from '../login/login.cmp';

import { ROUTING } from './login.routes';

import { UtilityModule } from '../shared/modules/utility.module';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';

import { AppService } from '../shared/services/app.service';

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
                dtService: DTService) =>
                new DTHttpInterceptor(backend, defaultOptions, dtService),
            deps: [XHRBackend, RequestOptions, DTService]
        }
    ]
})
export class LoginModule { }
