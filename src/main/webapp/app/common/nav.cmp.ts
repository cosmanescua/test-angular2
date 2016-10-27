import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';
import { DTService } from '../dtShared/dt.service';

@Component({
    moduleId: module.id,
    selector: 'navigation-menu',
    templateUrl: 'nav.cmp.html',

    encapsulation: ViewEncapsulation.None
})

export class NavCmp implements OnInit {
    bRouteChanged: boolean;

    logoutLoading: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _translateService: TranslateService,
        private _appService: AppService,
        private _dtService: DTService,
        private _authService: AuthService) { }

    /*--------- App logic --------*/
    /**
     * Change language on flag click
     * @author DynTech
     */
    changeLanguage(lang: string): void {
        this._appService.changeLang(lang);
    }

    /**
     * REST - Login authentication with token returned as data
     * @author DynTech
     */
    logout(): void {
        this.logoutLoading = true;
        this._authService.logout().toPromise().then(res => {
            AuthService.clearAuth();
            this.logoutLoading = false;
            this._authService.redirectUrl = '';
        }, error => {
            console.log('LOGIN FAILED');
            this.logoutLoading = false;

        })
    }

    /**
     * Check if logged in user can see given route
     * @author DynTech
     */
    checkRoute(route: string): boolean {
        return this._authService.userRoutes[route];
    }

    /*--------- Utility ---------*/
    /**
     * Match default language for click prevention
     * @author DynTech
     */
    matchDefaultLanguage(lang: string): boolean {
        return lang == this._appService.defaultLanguage;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        this.logoutLoading = false;

        this._translateService.use(this._appService.getStoredLanguage());

        this._appService.navLanguageChanged.subscribe(lang => {
            this._appService.changeLangTranslate(this._translateService, lang);
        });

        this._dtService.setInitCompanyCSS();
    }

    ngOnDestroy(): void {
        this._appService.refreshEmitters(true);
    }
}