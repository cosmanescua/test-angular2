import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavCmp }   from './nav.cmp';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';


import { UtilityModule } from '../shared/modules/utility.module';

@NgModule({
    imports: [
        UtilityModule,
        RouterModule,
         TranslateModule.forRoot({ 
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'rest/translations/navigation', ''),
          deps: [Http]
        })
    ],
    exports: [NavCmp],
    declarations: [NavCmp],
    providers: [
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                cookieService: CookieService) =>
                new DTHttpInterceptor(backend, defaultOptions, cookieService),
            deps: [XHRBackend, RequestOptions, CookieService]
        },
    ],
})
export class NavModule { }
