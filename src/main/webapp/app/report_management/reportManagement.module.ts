import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { CalendarModule, DataScrollerModule, GrowlModule, MessagesModule, SelectButtonModule } from 'primeng/primeng';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { AlertModule } from 'ng2-bootstrap/components/alert';

import { ReportManagementCmp } from './reportManagement.cmp';
import { ReportManagementService } from './reportManagement.service';

import { ValidationService } from '../shared/services/validation.service';
import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { CapitalPipe } from '../shared/pipes/capital.pipe';
import { ReportFilterPipe } from './pipes/reportFilter.pipe';

import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';
import { DTService } from '../dtShared/dt.service';

import { ROUTING } from './reportManagement.routes';

import { UtilityModule } from '../shared/modules/utility.module';
import { AppService } from '../shared/services/app.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CalendarModule,
        DataScrollerModule,
        GrowlModule,
        MessagesModule,
        AlertModule,
        ROUTING,
        UtilityModule,
        ControlMessageModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'rest/translations/reportManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        ReportManagementCmp,
        CapitalPipe,
        ReportFilterPipe
    ],
    providers: [
        ReportManagementService,
        ValidationService,
        Validators,
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

export class ReportManagementModule { }
