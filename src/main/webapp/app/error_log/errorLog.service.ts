import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class ErrorLogService{
    private _baseUrl: string = 'log/';

    constructor(private _http: Http){}
    
    /**
     * Rest call for getting all logs in a list
     * @author DynTech
     */
    getLog(): Observable<any> {

        return this._http.get(this._baseUrl + 'logs')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /**
     * Rest call for getting log trace by id
     * @author DynTech
     */
    getLogById(id: number): Observable<any> {

        return this._http.get(this._baseUrl + 'traces/' + id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /**
     * Rest call for causeing exception on backend and storing it into DB
     * @author DynTech
     */
    causeException(): Observable<any> {
        return this._http.get('test/exc')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


    /**
     * Error message handler
     * @author DynTech
     */
    private handleError(error: Response){
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }

}