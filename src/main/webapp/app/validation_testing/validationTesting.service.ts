import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ValidationTestingService {
    private _baseUrl: string;
    
    /*--------- Constructor --------*/
    constructor(private _http: Http) {
        this._baseUrl = 'rest/';
    }
    
    /*--------- App logic --------*/
    public testException(obj: any):Observable<any> {
        return this._http.post("test/forms", JSON.stringify(obj));
    }
}