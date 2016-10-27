import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { CalendarModule, DataScrollerModule, GrowlModule, MessagesModule, SelectButtonModule } from 'primeng/primeng';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { ValidationService } from '../shared/services/validation.service';
import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { CapitalPipe } from '../shared/pipes/capital.pipe';

import { CookieService } from 'angular2-cookie/core';
import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';

import { ROUTING } from './home.routes';

import { HomeCmp } from './home.cmp';

import { UtilityModule } from '../shared/modules/utility.module';
import { AppService } from '../shared/services/app.service';

@NgModule({
    imports: [
        
        ROUTING,
        UtilityModule
    ],
    declarations: [
        HomeCmp,
    ],
    providers: [],
})

export class HomeModule { }
