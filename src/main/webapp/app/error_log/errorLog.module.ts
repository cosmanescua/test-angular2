import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ErrorLogService } from './errorLog.service';
import { ErrorLogCmp } from './errorLog.cmp';
import { ErrorLogTraceCmp } from './errorLogTrace.cmp';

import { ROUTING } from './errorLog.routes';

import { UtilityModule } from '../shared/modules/utility.module';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule
    ],
    declarations: [
        ErrorLogCmp,
        ErrorLogTraceCmp
    ],
    providers: [
        ErrorLogService,
        // ActivatedRoute
    ]
})

export class ErrorLogModule { }