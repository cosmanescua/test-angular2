import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UsersCmp } from '../users/users.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: UsersCmp
    }
]);