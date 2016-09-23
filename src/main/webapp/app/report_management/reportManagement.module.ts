import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { CalendarModule, DataScrollerModule, GrowlModule, MessagesModule, SelectButtonModule } from 'primeng/primeng';
import { DTService } from '../dtShared/dt.service';
import { ReportManagementCmp } from '../report_management/reportManagement.cmp';
import { ReportManagementService } from '../report_management/reportManagement.service';

import { ValidationService } from '../shared/services/validation.service';
import { ControlMessages } from '../shared/controlMessage.cmp';

import { CapitalPipe } from '../shared/pipes/capital.pipe';

import { CookieService } from 'angular2-cookie/core';
import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';

import { ROUTING } from '../report_management/reportManagement.routes';

import { UtilityModule } from '../shared/modules/utility.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CalendarModule,
        DataScrollerModule,
        GrowlModule,
        MessagesModule,
        SelectButtonModule,
        ROUTING,
        UtilityModule
    ],
    declarations: [
        ReportManagementCmp,
        CapitalPipe,
        ControlMessages
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
                cookieService: CookieService) =>
                new DTHttpInterceptor(backend, defaultOptions, cookieService),
            deps: [XHRBackend, RequestOptions, CookieService]
        },
    ],
})

export class ReportManagementModule { }
