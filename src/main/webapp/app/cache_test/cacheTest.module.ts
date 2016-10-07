import { NgModule } from '@angular/core';

import { CacheTestCmp } from './cacheTest.cmp';

import { SecondsFromNanoPipe } from '../shared/pipes/secondsFromNano.pipe';
import { DotSeparatorPipe } from '../shared/pipes/dotSeparator.pipe';

import { CacheTestService } from './cacheTest.service';

import { UtilityModule } from '../shared/modules/utility.module';

import { ROUTING } from './cacheTest.routes';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
    ],
    declarations: [
        CacheTestCmp,
        SecondsFromNanoPipe,
        DotSeparatorPipe
    ],
    providers: [
        CacheTestService,
    ],
})
export class CacheTestModule { }
