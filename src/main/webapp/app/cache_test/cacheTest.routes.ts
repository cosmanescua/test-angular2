import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CacheTestCmp }   from './cacheTest.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: CacheTestCmp
    }
]);