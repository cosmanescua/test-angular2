import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { NavCmp } from './nav.cmp';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';
import { DTService } from '../dtShared/dt.service';

import { AlertModule } from 'ng2-bootstrap/components/alert';

import { UtilityModule } from '../shared/modules/utility.module';

import { AppService } from '../shared/services/app.service';

@NgModule({
    imports: [
        UtilityModule,
        RouterModule,
        AlertModule,
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
                dtService: DTService) =>
                new DTHttpInterceptor(backend, defaultOptions, dtService),
            deps: [XHRBackend, RequestOptions, DTService]
        }
    ],
})
export class NavModule { }
