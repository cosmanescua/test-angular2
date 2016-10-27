import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { ValidationTestingCmp } from './validationTesting.cmp';
import { UtilityModule } from '../shared/modules/utility.module';

import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';
import { DTService } from '../dtShared/dt.service';

import { ControlMessageModule } from '../shared/modules/controlMessages.module';
import { ValidationTestingService } from './validationTesting.service';
import { AppService } from '../shared/services/app.service';

import { ROUTING } from './validationTesting.routes';

@NgModule({
    imports: [
        ReactiveFormsModule,
        UtilityModule,
        ControlMessageModule,
        ROUTING
    ],
    exports: [],
    declarations: [
        ValidationTestingCmp,
    ],
    providers: [
        FormBuilder,
        Validators,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                dtService: DTService) =>
                new DTHttpInterceptor(backend, defaultOptions, dtService),
            deps: [XHRBackend, RequestOptions, DTService]
        },
        ValidationTestingService
    ],
})
export class ValidationTestingModule { }
