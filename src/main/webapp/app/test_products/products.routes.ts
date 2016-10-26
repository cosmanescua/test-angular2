import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProductsComponent } from './products.component';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ProductsComponent
    }
]);