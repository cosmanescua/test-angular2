import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule} from '@angular/common';

import { ControlMessages }   from '../controlMessages.cmp';

@NgModule({
    imports: [CommonModule],
    declarations: [ControlMessages],
    exports: [ControlMessages],
})
export class ControlMessageModule { }
