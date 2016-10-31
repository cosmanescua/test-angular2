import { NgModule } from '@angular/core';

import { ProductsComponent } from './products.component';

import { ROUTING } from './products.routes';

import { UtilityModule } from '../shared/modules/utility.module';
import {ProductsService} from './products.service';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        DataTableModule,
        SharedModule,
        DialogModule

    ],
    declarations: [
       ProductsComponent
    ],
    providers: [
        ProductsService
    ],
})
export class TestProductsModule{ }
