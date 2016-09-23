import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Login } from '../login/login.model';


@Injectable() 
export class LoginService{
    private _baseUrl: string = 'rest/';

    constructor(private _http: Http){}
    
    login(loginData: Login): Observable<any> { //Login authentication with token returned as data
        let headers = new Headers({ 
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._baseUrl + 'user/authenticate', JSON.stringify(loginData), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }

}