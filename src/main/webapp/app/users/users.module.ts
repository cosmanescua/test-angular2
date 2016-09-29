import { NgModule } from '@angular/core';

import { UsersCmp } from '../users/users.cmp';

import { ROUTING } from './users.routes';
import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';

import { UsersFilterNamePipe } from '../shared/pipes/usersNameFilter.pipe';


import { UtilityModule } from '../shared/modules/utility.module';
import {UsersService} from '../users/users.service';
import {ClientsService} from '../clients/clients.service';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        DragulaModule
    ],
    declarations: [
       UsersCmp,
       UsersFilterNamePipe
    ],
    providers: [
        UsersService,
        DragulaService,
        ClientsService
    ],
})
export class UsersModule { }
