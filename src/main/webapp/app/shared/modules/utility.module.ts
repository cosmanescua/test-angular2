import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';

import { DTService } from '../../dtShared/dt.service';
import { PipesModule } from '../modules/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        PipesModule
    ],
    providers: [
        CookieService,
        Title,
        DTService,
    ]
})

export class UtilityModule { }
