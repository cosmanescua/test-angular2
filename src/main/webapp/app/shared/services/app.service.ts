import { Component, Inject, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import { UserInfo, UserProfile } from '../models';

import { DTService } from '../../dtShared/dt.service';

import { AuthService } from './auth.service';

@Injectable()
export class AppService {
    private defaultAppTitle: string;
    defaultLanguage: string;
    userProfile: UserProfile;
    static defaultPage: string;
    initModuleLoaded: boolean;

    postLoginLoad: boolean;

    static bLanguageLoading: boolean;
    languageChanged = new EventEmitter();
    static languageChangeCompletedEmit = new EventEmitter();
    navLanguageChanged = new EventEmitter();

    static router: Router;

    constructor(
        private _http: Http,
        private _traslateService: TranslateService,
        private _title: Title,
        private _dtService: DTService,
        private _authService: AuthService
    ) {
        this.defaultAppTitle = 'KFuture | ';
        this.defaultLanguage = this.getStoredLanguage() || 'en';
        AppService.bLanguageLoading = false;
        this.userProfile = new UserProfile();
        this.initModuleLoaded = false;

        this.postLoginLoad = false;

        AppService.defaultPage = 'home';
    }

    /**
     * Get loading state of chaning language
     * @author DynTech
     */
    getBLanguageLoading(): boolean {
        return AppService.bLanguageLoading;
    }

    /**
     * Set default app language
     * @author DynTech
     */
    getStoredLanguage(): string {
        return localStorage.getItem('defaultLang');
    }

    /**
     * Set default app language
     * @author DynTech
     */
    setStoredLanguage(lang: string): void {
        this.defaultLanguage = lang;
        localStorage.setItem('defaultLang', lang);
    }

    /**
     * Set router from component for interceptor 
     * @author DynTech
     */
    setRouter(router: Router): void {
        AppService.router = router;
    }

    /**
     * Method to be executed when page is loaded 
     * @author DynTech
     */
    pageLoaded(title: string, isLogin?: boolean): void {
        this._title.setTitle(this.defaultAppTitle + title);
        if (!isLogin) {
            this._dtService.setInitCompanyCSS();
            this.initModuleLoaded = true;
        }
    }

    /**
     * Change language and emmit change
     * @author DynTech
     */
    changeLang(lang: string): void {
        AppService.bLanguageLoading = true;
        this.changeLangRest(lang).toPromise().then(() => {
            localStorage.setItem('defaultLang', lang);
            this.defaultLanguage = lang;
            AppService.bLanguageLoading = false;

            this.languageChanged.emit(lang);

            this.navLanguageChanged.emit(lang);
        })
    }

    /**
     * Change languge by using translate reference from component with give lang
     * @author DynTech
     */
    changeLangTranslate(translate: TranslateService, lang: string, bDontEmit?: boolean): void {
        AppService.bLanguageLoading = true;
        translate.use(lang).subscribe(() => {
            AppService.bLanguageLoading = false;

            if (!bDontEmit) {
                AppService.languageChangeCompleted();
            }
        }, err => {
            AppService.bLanguageLoading = false;
        });
    }

    /**
     * Emit translation completion
     * @author DynTech
     */
    static languageChangeCompleted(): void {
        AppService.languageChangeCompletedEmit.emit();
    }

    /**
     * Unsubscribe from event emitters onDestroy component
     * @author DynTech
     */
    refreshEmitters(refreshNav?: boolean): void {
        AppService.languageChangeCompletedEmit.unsubscribe();
        this.languageChanged.unsubscribe();

        AppService.languageChangeCompletedEmit = new EventEmitter();
        this.languageChanged = new EventEmitter();

        if (refreshNav) {
            this.navLanguageChanged.unsubscribe();
            this.navLanguageChanged = new EventEmitter();
        }
    }

    /**
     * Change language - REST
     * @author DynTech
     */
    private changeLangRest(lang: string): Observable<any> {
        return this._http.get('rest/translations/language/' + lang);
    }

    /**
     * Converting retrieved routes from init or getUser to array of routes
     * @author DynTech
     */
    convertRoutesToObjects(userInfo: UserInfo): Object {
        let __routes: Object = {};

        for (let route of userInfo.userRoutes) {
            __routes[route.url] = true;
        }

        return __routes;
    }
}