import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

import { DTGlobalLoaderCmp } from './dt.globalLoader.cmp';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        DTGlobalLoaderCmp
    ],
    declarations: [
        DTGlobalLoaderCmp
    ],
    providers: [],
})
export class DTGlobalLoaderModule { }