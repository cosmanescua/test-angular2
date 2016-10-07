import { Component, Output, EventEmitter } from '@angular/core';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../shared/services/app.service';
import { DTService } from '../dtShared/dt.service';

@Component({
    moduleId: module.id,
    selector: 'navigation-menu',
    templateUrl: 'nav.cmp.html',

})

export class NavCmp {
    @Output() onTranslationChange = new EventEmitter();
    state: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _translate: TranslateService,
        private _appService: AppService,
        private _dtService: DTService) {

        // translate.setDefaultLang('prevod1');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use('prevod1');

        this._dtService.setInitCompanyCSS();
    }

    /*--------- App logic --------*/
    matchDefaultLanguage(lang: string): boolean {
        return lang == this._appService.defaultLanguage;
    }

    changeLanguage(lang: string): void {
        this._appService.changeLang(lang);
        // this._translate.use('');
    }

    /*--------- NG On Init ---------*/f
    ngOnInit() {
        // console.log('NG on init');
        this.state = true;
        this._translate.use('it');

        this._appService.languageChanged.subscribe(lang => {
            console.log(lang);

            this._translate.use(lang);

            // this.state = false;

            // setInterval(() => {
            //     this.state = true;
            // })
        });


        // this._appService.titleChanged.subscribe(lang => console.log(lang));
    }
}