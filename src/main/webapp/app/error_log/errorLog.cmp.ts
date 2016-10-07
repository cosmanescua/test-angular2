import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIf';
import { DTService } from '../dtShared/dt.service';

import { ErrorLogService } from '../error_log/errorLog.service';

@Component({
    moduleId: module.id,
    templateUrl: 'errorLog.cmp.html',
    // styleUrls: ['errorLog.cmp.css'],


    encapsulation: ViewEncapsulation.None
})
export class ErrorLogCmp implements OnInit, DTViewCmpIf {
    logs: any[];
    error: any;

    loadingState: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _errorLogService: ErrorLogService,
        private _dtService: DTService,
        private _router: Router
    ) { }


    /*--------- App logic --------*/

    /**
     * Get all logs
     * @author DynTech
     */
    getLogRest() {
        this.logs = [];
        this.loadingState = true;
        this._dtService.setRestMessageContent('ErrorLogCmp', 'getLogRest()');
        this._errorLogService.getLog().subscribe(result => {
            this.logs = result
            this.loadingState = false;
        }, error => {
            this.loadingState = false;
        });
    }

    /**
     * Cause exception on backend and store into DB as new exception
     * @author DynTech
     */

    causeException() {
        this.loadingState = true;

        this._dtService.setRestMessageContent('ErrorLogCmp', 'causeException()');
        this._errorLogService.causeException().subscribe(result => {
            this.loadingState = false;
        }, error => {
            this.loadingState = true;
            this.getLogRest();
        })
    }

    /**
     * Get log tracer by id
     * @author DynTech
     */
    selectErrorLog(log: any) {
        this._router.navigate(['error_log', log.id])
    }

    /*--------- NgOnInit --------*/
    ngOnInit() {
        // Variable initialization
        this.logs = [];
        this.loadingState = false;

        // Methods execution
        this.getLogRest();

        // Construct methods
        this.__setInitPageTitle('Error log');
    }

    /*--------- Interface imported --------*/
    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }
}