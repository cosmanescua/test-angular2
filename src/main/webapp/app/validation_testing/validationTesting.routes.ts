import { RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { ValidationTestingCmp } from './validationTesting.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ValidationTestingCmp
    }
]);