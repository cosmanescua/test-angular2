import { Component, Inject, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
    private defaultAppTitle: string;

    private selectedErrorLogName: string;

    defaultLanguage: string;

    languageChanged = new EventEmitter();

    constructor(
        private _http: Http
    ) {
        this.defaultAppTitle = 'KFuture | ';
        this.defaultLanguage = 'it';
    }

    /**
     * Get default app title prefix
     * @author DynTech
     */
    getDefaultAppTitle(): string {
        return this.defaultAppTitle;
    }

    /**
     * Set default app title prefix
     * @author DynTech
     */
    setDefaultAppTitle(title: string): void {
        this.defaultAppTitle = title;
    }

    /**
     * Set default app language
     * @author DynTech
     */
    getStoredLanguage(lang: string): void {
        localStorage.getItem('defaultLang');
    }

    /**
     * Change language and emmit change
     * @author DynTech
     */
    changeLang(lang: string): void {
        this.changeLangRest(lang).subscribe(result => {
            console.log('Lang changed');
            localStorage.setItem('defaultLang', lang);
            this.defaultLanguage = lang;

            this.languageChanged.emit(lang);
        })
    }

    /**
     * Change language - REST
     * @author DynTech
     */
    private changeLangRest(lang: string): Observable<any> {
        return this._http.get('rest/translations/language/' + lang);
    }
}