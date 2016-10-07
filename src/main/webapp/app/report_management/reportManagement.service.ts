import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportManagementService {
    private _baseUrl: string = 'rest/';

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
        return this._http.put(this._baseUrl + 'reports/book', JSON.stringify(booking)).map(
            (res) => res
        ).catch(this.handleError);
    }

    /**
     * Prints a report.
     * @author DynTech
     */
    printReport(reportData: any): any {
        let params = encodeURI(JSON.stringify(reportData.amReportParameterses));
        let url = this._baseUrl + "reports/" + reportData.reportId + "/" + reportData.format + "/inline?parameters=" + params;

        return this._http.get(url, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            }
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