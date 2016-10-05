import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TestFilesCmp } from '../test_file_upload/filesTest.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: TestFilesCmp
    }
]);