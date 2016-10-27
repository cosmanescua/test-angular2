import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable() 
export class LoginService{
    private _baseUrl: string = 'rest/';

    constructor(private _http: Http){}

    /**
     * REST - Get user info based on login token
     * @author DynTech
     */
    getUser(): Observable<any> {
        return this._http.get(this._baseUrl + 'user')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }

}