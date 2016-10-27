import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { AlertModule } from 'ng2-bootstrap/components/alert';

import { AdminCreateReportCmp } from '../admin-create_report/adminCreateReport.cmp';
import { AdminCreateReportService } from '../admin-create_report/adminCreateReport.service';

import { ShortTextPipe } from '../shared/pipes/shortText.pipe';
import { FileExtensionTrimmer } from '../shared/pipes/fileExtensionTrimmer.pipe';

import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';
import { DTService } from '../dtShared/dt.service';

import { ROUTING } from './adminCreateReport.routes';

import { UtilityModule } from '../shared/modules/utility.module';
import { AppService } from '../shared/services/app.service';

@NgModule({
    imports: [
        TooltipModule,
        UtilityModule,
        ROUTING,
        DragulaModule,
        AlertModule,
         TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'rest/translations/adminCreateReport', ''),
          deps: [Http]
        })
    ],
    declarations: [
        AdminCreateReportCmp,
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
                dtService: DTService) =>
                new DTHttpInterceptor(backend, defaultOptions, dtService),
            deps: [XHRBackend, RequestOptions, DTService]
        }
    ]
})
export class AdminCreateReportModule { }