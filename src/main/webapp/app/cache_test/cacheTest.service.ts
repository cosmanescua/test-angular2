import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class CacheTestService {
    private _baseUrl: string = 'rest/';

    constructor(private _http: Http){}

    /**
     * Test cache bay making call for getting data and reciving time 
     * @author DynTech
     */
    testCache(): Observable<any> {
        return this._http.get(this._baseUrl + 'testCache')
            .map((response: Response) => response.json());
    }

    /**
     * Clear cache on server side for fresh call 
     * @author DynTech
     */
    clearCache(): Observable<any> {
        return this._http.get(this._baseUrl + 'testCacheEvict')
            .map((response: Response) => response)
    }

    /**
     * Handle error on service layer
     * @author DynTech
     */
    private handleError(error: Response){
        // console.error(error);
        // return Observable.throw(error.json().error || 'Server error');
    }

}