import { NgModule } from '@angular/core';

import { ClientsCmp } from '../clients/clients.cmp';

import { ROUTING } from './clients.routes';


import { UtilityModule } from '../shared/modules/utility.module';
import {ClientsService} from '../clients/clients.service';
import {DataTableModule,SharedModule, DialogModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        DataTableModule,
        SharedModule,
        ButtonModule,
        FormsModule,
        DialogModule

    ],
    declarations: [
       ClientsCmp
    ],
    providers: [
        ClientsService
    ],
})
export class ClientsModule { }
