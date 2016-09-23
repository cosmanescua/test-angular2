import { Component, Output, EventEmitter } from '@angular/core';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { AppService } from '../shared/services/app.service';

// import { LoginCmp } from '../login/login.cmp';

@Component({
    selector: 'navigation-menu',
    templateUrl: 'app/common/nav.cmp.html',

})

export class NavCmp {
    @Output() onTranslationChange = new EventEmitter();


    constructor(translate: TranslateService,
    private _appService: AppService) { 

        translate.setDefaultLang('prevod1');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('prevod1');
     }

    promenaJezika():void {
        this.onTranslationChange.emit();
    }


    ngOnInit(){
        // console.log('NG on init');
        
        // this._appService.titleChanged.subscribe(lang => console.log(lang));
    }

}