import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { DTService } from './dt.service';
import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';

import { TOKEN_COOKIE_NAME } from '../constants';

import {
    RequestOptionsArgs,
    RequestOptions,
    ConnectionBackend,
    Http,
    Response,
    Headers
} from "@angular/http";

@Injectable()
export class DTHttpInterceptor extends Http {

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private _dtService: DTService) {
        super(backend, defaultOptions);

    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: number = url.indexOf('translations');
        let tempUrlChangeLang: number = url.indexOf('translations/language');
        let that = this;

        if (tempUrl == -1) {// Check if GET call is from Translation module
            return super.get(url, this.getAuthTokenHeader(options)).do(res => {
                this._dtService.restConsoleMessage(url, 'GET', res.status, true, res);

                return Observable;
            }, err => {
                this.handleErrorRequest(err.status, url, 'GET', false, err, true);

                return Observable.throw(err);
            });
        } else if (tempUrlChangeLang == -1) {
            AppService.bLanguageLoading = true;
            let transformedUrl: any = url.split('/');
            transformedUrl = transformedUrl.splice(0, transformedUrl.length - 1);
            transformedUrl = transformedUrl.join('/');

            return super.get(transformedUrl, this.getAuthTokenHeader(options)).do(() => {
                AppService.bLanguageLoading = false;

                return Observable;
            }, err => {
                AppService.bLanguageLoading = false;
                this.handleErrorRequest(err.status, url, 'GET', false, err, false);

                return Observable.throw(err);
            });
        } else {
            return super.get(url, this.getAuthTokenHeader(options)).do(res => {

                AppService.bLanguageLoading = false;
            }, err => {
                AppService.bLanguageLoading = false;
                this.handleErrorRequest(err.status, url, 'GET', false, err, false);

                return Observable.throw(err);
            })
        }
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: any = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        let that = this;        

        if (tempUrl != 'authenticate') {
            return super.post(url, body, this.getAuthTokenHeader(options, 'application/json')).do(res => {
                this._dtService.restConsoleMessage(url, 'POST', res.status, true, res);

                return Observable;
            }, err => {
                this.handleErrorRequest(err.status, url, 'POST', false, err, true);

                return Observable.throw(err);
            });
        } else {
            return super.post(url, body, options).do(res => {
                this._dtService.restConsoleMessage(url, 'POST', res.status, true, res);

                return Observable;
            }, err => {
                this.handleErrorRequest(err.status, url, 'POST', false, err, true);

                return Observable.throw(err);
            });
        }
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: any = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        let that = this;

        return super.put(url, body, this.getAuthTokenHeader(options, 'application/json')).do(res => {
            this._dtService.restConsoleMessage(url, 'PUT', res.status, true, res);

            return Observable;
        }, err => {
            this.handleErrorRequest(err.status, url, 'PUT', false, err, true);

            return Observable.throw(err);
        });
    }

    /**
     * Get header with token and additional options from original request
     * @author DynTech
     */
    private getAuthTokenHeader(options: RequestOptionsArgs, contentType?: string): RequestOptions {
        let tempheaders = {};
        tempheaders[TOKEN_COOKIE_NAME] = this._dtService.getToken();

        let headers: Headers = new Headers(tempheaders);

        if (contentType) {
            headers.append('Content-Type', contentType);
        }

        if (options && options.responseType) {
            return new RequestOptions({ headers: headers, responseType: options.responseType });
        } else {
            return new RequestOptions({ headers: headers });
        }
    }

    /**
     * Method for handling request with error
     * @author DynTech
     */
    private handleErrorRequest(statusCode: number, url: string, method: string, success: boolean, err: any, consoleLog: boolean): void {
        if (consoleLog) {
            this._dtService.restConsoleMessage(url, method, statusCode, success, err);
        }
        if (statusCode === 401) {
            AuthService.clearAuth();
            AuthService.bLoginStatus = false;
            AppService.router.navigate(['login'])
        }
    }
}