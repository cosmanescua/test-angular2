import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportManagementService {
    private _baseUrl: string = 'rest/';

    headers = new Headers({
        'Content-Type': 'application/json'
    });
    options = new RequestOptions({ headers: this.headers });

    constructor(private _http: Http) { }

    /**
     * Retrieves all reports from database.
     * @author DynTech
     */
    getReports(): any {
        return this._http.get(this._baseUrl + 'reports').map(
            (res) => res.json()
        ).catch(this.handleError);
    }

    /**
     * Saves a report into database for later use.
     * @author DynTech
     */
    addBooking(booking: any): any {
        return this._http.put(this._baseUrl + 'reports/book', JSON.stringify(booking), this.options).map(
            (res) => res
        ).catch(this.handleError);
    }

    /**
     * Prints a report.
     * @author DynTech
     */
    printReport(reportData: any): any {
        let params = encodeURI(JSON.stringify(reportData.parameters));
        let url = this._baseUrl + "reports/"+reportData.reportId+"/"+reportData.format+"/inline?parameters="+params;
        return this._http.get(url).map(
            (res) => res
        ).catch(this.handleError);
    }

    /**
     * Handles an error.
     * @author DynTech
     */
    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }

}