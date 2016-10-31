import { NgModule } from '@angular/core';

import { ProductsComponent } from './products.component';

import { ROUTING } from './products.routes';

import { UtilityModule } from '../shared/modules/utility.module';
import {ProductsService} from './products.service';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        DataTableModule,
        SharedModule,
        DialogModule,
        PaginationModule

    ],
    declarations: [
       ProductsComponent
    ],
    providers: [
        ProductsService
    ],
})
export class TestProductsModule{ }
