import { NgModule } from '@angular/core';

import { ClientsCmp } from '../clients/clients.cmp';

import { ROUTING } from './filesTest.routes';


import { UtilityModule } from '../shared/modules/utility.module';
import {DataTableModule,SharedModule, DialogModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {TestFilesCmp} from '../test_file_upload/filesTest.cmp';
import {FileUploader, FileSelectDirective, FileDropDirective} from 'ng2-file-upload';
import { CookieService } from 'angular2-cookie/core';
import { DTHttpInterceptor } from '../dtShared/dt.httpInterceptor';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {TestFilesService} from './filesTest.service';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule
        
    ],
    declarations: [
       TestFilesCmp,
       FileSelectDirective,
       FileDropDirective
       
    ],
    providers: [
        TestFilesService,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                cookieService: CookieService) =>
                new DTHttpInterceptor(backend, defaultOptions, cookieService),
            deps: [XHRBackend, RequestOptions, CookieService]
        },
    ],
})
export class FilesTestModule { }
