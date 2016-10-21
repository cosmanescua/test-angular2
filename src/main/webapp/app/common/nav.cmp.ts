import { Component, Output, EventEmitter } from '@angular/core';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../shared/services/app.service';
import { DTService } from '../dtShared/dt.service';
import { CookieService } from 'angular2-cookie/core';
import {GlobalEventsManager} from '../test-routes/globalEventManager.service';
import {AuthenticationService} from '../test-routes/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'navigation-menu',
    templateUrl: 'nav.cmp.html',

})

export class NavCmp {
    @Output() onTranslationChange = new EventEmitter();
    state: boolean;
    //this flag is used for conditionally display some items in the navigation bar - sections that must be available only for admin
    isAdminUser: boolean=false;

    /*--------- Constructor --------*/
    constructor(
        private _translate: TranslateService,
        private _appService: AppService,
        private _dtService: DTService,
        private _cookieService: CookieService,
        private _globalEventsManager:GlobalEventsManager,
        private _authenticationService: AuthenticationService) {

        // translate.setDefaultLang('prevod1');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use('prevod1');

        this._dtService.setInitCompanyCSS();
        this._globalEventsManager.showNavBar.subscribe((mode)=>{
            console.log("event emitted")
        });
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
    //verify if the current user logged in has permissions fo the routes
    public checkPermission(route):boolean
    {
        return this._authenticationService.checkPermission(route);
    }
  
}