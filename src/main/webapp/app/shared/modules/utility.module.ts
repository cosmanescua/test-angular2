import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';

import { DTService } from '../../dtShared/dt.service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        FormsModule,
        CommonModule,
    ],
    providers: [
        CookieService,
        Title,
        DTService,
    ]
})

export class UtilityModule { }
