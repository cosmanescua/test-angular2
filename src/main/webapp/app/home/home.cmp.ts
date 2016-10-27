import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DTService } from '../dtShared/dt.service';
import { AppService } from '../shared/services/app.service';

declare let saveAs: any;
declare let download: any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeCmp implements OnInit {
    
    /*--------- Constructor --------*/
    constructor(
        private _dtService: DTService,
        private _appService: AppService) { }


    /*--------- App logic --------*/


    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Variable initialization
        this._appService.pageLoaded('Report management');
    }
}