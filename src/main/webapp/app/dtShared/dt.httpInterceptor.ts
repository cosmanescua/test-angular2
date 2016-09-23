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
        let tempThis = this;

        console.log('GET');
        
        return super.get(url, this.getAuthTokenHeader()).do(result => {
            // DTService.restConsoleMessage(url, 'GET', result.status, true);

            return Observable;
        }).catch(err => {
            // DTService.restConsoleMessage(url, 'GET', err.status, false);
            console.log('catch');
            // if (err.status === 404) {
            //     console.log('404 greska');
            //     return Observable.throw(err);
            // } else {
            return Observable.throw(err);
            // }
        });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let tempThis = this;
        let tempUrl: any = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];

        console.log('POST');

        console.log(tempUrl);


        if (tempUrl != 'authenticate') {
            return super.post(url, body, this.getAuthTokenHeader()).do(result => {
                DTService.restConsoleMessage(url, 'POST', result.status, true);
                // tempThis._dtService.restConsoleMessage(url, 'POST', result.status , true);

                return Observable;
            }).catch(err => {
                // console.log('catch');
                // console.log(123);

                // DTService.restConsoleMessage(url, 'POST', err.status , false);

                // console.log(1234);

                // if (err.status === 404) {
                //     console.log('404 greska');
                //     return Observable.throw(err);
                // } else {
                return Observable.throw(err);
                // }
            });
        } else {
            return super.post(url, body, options);
        }
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let tempUrl: any = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];

        console.log('PUT');

        return super.put(url, body, this.getAuthTokenHeader()).do(result => {
            return Observable;
        }).catch(err => {
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

    getAuthTokenHeader(): RequestOptions {
        let headers: Headers = new Headers({
            'X-Auth-Token': this.getToken(),
            'Content-Type': 'application/json'
        });

        let requestOptions: RequestOptions = new RequestOptions({ headers: headers });
        return requestOptions;
    }
}