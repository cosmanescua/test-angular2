import { NgModule } from '@angular/core';

import { ErrorLogService } from '../error_log/errorLog.service';
import { ErrorLogCmp } from '../error_log/errorLog.cmp';

import { ROUTING } from './errorLog.routes';

import { UtilityModule } from '../shared/modules/utility.module';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule
    ],
    declarations: [
        ErrorLogCmp
    ],
    providers: [
        ErrorLogService
    ]
})

export class ErrorLogModule { }