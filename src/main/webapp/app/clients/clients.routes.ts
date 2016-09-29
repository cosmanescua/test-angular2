import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ClientsCmp } from '../clients/clients.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ClientsCmp
    }
]);