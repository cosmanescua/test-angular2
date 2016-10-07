import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CookieService } from 'angular2-cookie/core';

import { DTService } from './dt.service';

import {
    RequestOptionsArgs,
    RequestOptions,
    ConnectionBackend,
    Http,
    Request,
    Response,
    Headers
} from "@angular/http";

@Injectable()
export class DTHttpInterceptor extends Http {

    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private _cookieService: CookieService) {

        super(backend, defaultOptions);



    }

    request(url: string | Request, options?: RequestOptionsArgs) {
        return super.request(url, options);
    }


    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: number = url.indexOf('i18n');
        

        if (tempUrl == -1) {// Check if GET call is from Translation module
            return super.get(url, this.getAuthTokenHeader(options)).do(result => {
                DTService.restConsoleMessage(url, 'GET', result.status, true, result);

                return Observable;
            }).catch(err => {
                DTService.restConsoleMessage(url, 'GET', err.status, false, err);
                console.log('catch');
                // if (err.status === 404) {
                //     console.log('404 greska');
                //     return Observable.throw(err);
                // } else {
                return Observable.throw(err);
                // }
            });
        } else {
            return super.get(url);
        }

    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: any = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];

        if (tempUrl != 'authenticate') {
            return super.post(url, body, this.getAuthTokenHeader(options, 'application/json')).do(result => {
                DTService.restConsoleMessage(url, 'POST', result.status, true, result);

                return Observable;
            }).catch(err => {
                // console.log('catch');
                // console.log(123);
                DTService.restConsoleMessage(url, 'POST', err.status, false, err);

                // console.log(1234);

                // if (err.status === 404) {
                //     console.log('404 greska');
                //     return Observable.throw(err);
                // } else {
                return Observable.throw(err);
                // }
            });
        } else {
            return super.post(url, body, options).do(result => {
                DTService.restConsoleMessage(url, 'POST', result.status, true, result);

                return Observable;
            }).catch(err => {
                DTService.restConsoleMessage(url, 'POST', err.status, false, err);

                return Observable.throw(err);
            });
        }
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: any = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        return super.put(url, body, this.getAuthTokenHeader(options, 'application/json')).do(result => {
            DTService.restConsoleMessage(url, 'PUT', result.status, true, result);
            return Observable;
        }).catch(err => {
            DTService.restConsoleMessage(url, 'POST', err.status, true, err);
            console.log('catch');
            // if (err.status === 404) {
            //     console.log('404 greska');
            //     return Observable.throw(err);
            // } else {
            return Observable.throw(err);
            // }
        });
    }

    getToken(): any {
        let tempToken: string = this._cookieService.get('X-Auth-Token');
        return tempToken;
    }

    getAuthTokenHeader(options: RequestOptionsArgs, contentType?: string): RequestOptions {
        let headers: Headers = new Headers({
            'X-Auth-Token': this.getToken()
        });

        if (contentType) {
            headers.append('Content-Type', contentType);
        }

        if (options && options.responseType) {
            return new RequestOptions({ headers: headers, responseType: options.responseType });
        } else {
            return new RequestOptions({ headers: headers });
        }
    }
}