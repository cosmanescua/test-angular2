import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ErrorLogCmp } from './errorLog.cmp';
import { ErrorLogTraceCmp } from './errorLogTrace.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ErrorLogCmp
    },
    {
        path: ':id',
        component: ErrorLogTraceCmp
    }
]);