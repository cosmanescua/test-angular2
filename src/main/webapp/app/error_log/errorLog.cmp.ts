import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIf';
import { DTService } from '../dtShared/dt.service';

import { ErrorLogService } from '../error_log/errorLog.service';

@Component({
    templateUrl: 'app/error_log/errorLog.cmp.html',
    styleUrls: ['app/error_log/errorLog.cmp.css'],
})
export class ErrorLogCmp implements OnInit, DTViewCmpIf {
    logs: any[];
    error: any;

    /*--------- Constructor --------*/
    constructor(private _dtService: DTService,
        private _errorLogService: ErrorLogService) { }

    
    /*--------- App logic --------*/
    /**
     * Get all logs in list
     * @author DynTech
     */
    getLog() {
        this._errorLogService.getLog().subscribe(logs => this.logs = logs);
    }
    
    /**
     * Get log tracer by id
     * @author DynTech
     */
    getLogById(id: number) {
        this._errorLogService.getLogById(id).subscribe(error => {
            this.error = error;

            this.error.trace = this.formatLogMessage(this.error.trace);
        });
    }

    /**
     * Format log message
     * @author DynTech
     */
    formatLogMessage(message: string): string {
        let tempMessage: any = message.replace(/(\r\n|\n|\r)/gm, "<br>");

        tempMessage = tempMessage.split('<br>');

        for (let i in tempMessage) {
            let tempLineSecondSection = tempMessage[i].split("(");
            if (tempLineSecondSection[1]) {
                tempLineSecondSection[0] = '- <i>' + tempLineSecondSection[0] + '</i> <b>';
                tempLineSecondSection[1] += '</b>';
            } else {
                
                tempLineSecondSection[0] = '- <i>' + tempLineSecondSection[0] + '</i>';
            }

            tempMessage[i] = tempLineSecondSection.join('(');
        }

        // console.log(tempMessage);
        return tempMessage.join("<br>");
    }


    /*--------- NgOnInit --------*/
    ngOnInit() {
        this.__setInitPageTitle('Error log');

        this.logs = [];

        this.getLog();
        // this.getLogById(108);

    }

    //*--------- Interface imported --------*/
    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }

}