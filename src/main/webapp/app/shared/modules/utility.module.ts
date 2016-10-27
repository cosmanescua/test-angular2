import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';

import { DTService } from '../../dtShared/dt.service';
import { PipesModule } from '../modules/pipes.module';

import { DTGlobalLoaderModule } from '../../dtShared/global_loader/dt.globalLoader.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        DTGlobalLoaderModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        PipesModule,
        DTGlobalLoaderModule
    ],
    providers: [
        // Router,
        CookieService,
        Title,
        DTService,
    ]
})

export class UtilityModule { }
