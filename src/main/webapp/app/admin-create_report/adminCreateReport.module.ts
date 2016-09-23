import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { CookieService } from 'angular2-cookie/core';

import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { AdminCreateReportCmp } from '../admin-create_report/adminCreateReport.cmp';
import { AdminCreateReportService } from '../admin-create_report/adminCreateReport.service';

import { BytesConverterPipe } from '../shared/pipes/bytesConverter.pipe';
import { ShortTextPipe } from '../shared/pipes/shortText.pipe';
import { FileExtensionTrimmer } from '../shared/pipes/fileExtensionTrimmer.pipe';

import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';
import { DTService } from '../dtShared/dt.service';

import { ROUTING } from './adminCreateReport.routes';

import { UtilityModule } from '../shared/modules/utility.module';


@NgModule({
    imports: [
        TooltipModule,
        UtilityModule,
        ROUTING,
        DragulaModule,
        HttpModule,
         TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'app/assets/i18n/', '.json'),
          deps: [Http]
        })
    ],
    declarations: [
        AdminCreateReportCmp,
        BytesConverterPipe,
        ShortTextPipe,
        FileExtensionTrimmer
    ],
    providers: [
        DragulaService,
        AdminCreateReportService,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                cookieService: CookieService) =>
                new DTHttpInterceptor(backend, defaultOptions, cookieService),
            deps: [XHRBackend, RequestOptions, CookieService]
        }
    ]
})
export class AdminCreateReportModule { }