import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProductsCmp } from './products.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ProductsCmp
    }
]);