import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class AdminCreateReportService {
    private _baseUrl: string = 'rest/';

    constructor(private _http: Http){}

    /**
     * Create new report with given data
     * @author DynTech
     */
    createReport(reportProfile: any): Observable<any> {
        return this._http.post(this._baseUrl + 'reports', JSON.stringify(reportProfile))
            .map((response: Response) => response.json());
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