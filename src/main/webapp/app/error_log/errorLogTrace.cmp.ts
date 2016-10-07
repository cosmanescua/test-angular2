import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ErrorLogService } from './errorLog.service';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';

@Component({
    moduleId: module.id,
    templateUrl: 'errorLogTrace.cmp.html'
})
export class ErrorLogTraceCmp implements OnInit, DTViewCmpIf {
    trace: string;
    loadingState: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _errorLogService: ErrorLogService,
        private _dtService: DTService,
        private _activatedRoute: ActivatedRoute
    ) { }


    /*------------- App logic ------------*/
    /**
     * Get all logs in list
     * @author DynTech
     */
    getTrace(id: number) {
        this.loadingState = true;
        this._dtService.setRestMessageContent('ErrorLogTraceCmp', 'getTrace()');
        this._errorLogService.getLogById(id).subscribe((result: any) => {
            this.trace = this.formatLogMessage(result.trace);
            this.loadingState = false;
        }, error => {
            this.loadingState = false;
        });
    }

    /**
     * Format trace message
     * @author DynTech
     */
    formatLogMessage(message: string): string {
        let tempMessage: any = message.replace(/(\r\n|\n|\r)/gm, "<br>");
        tempMessage = tempMessage.split('<br>');
        tempMessage.pop();

        for (let i in tempMessage) {
            let tempLineSecondSection = tempMessage[i].split("(");
            if (tempLineSecondSection[1]) {
                tempLineSecondSection[0] = '<div class="trace_row"><span class="method">' + tempLineSecondSection[0] + '</span><span class="code_trace">';
                tempLineSecondSection[1] += '</span></div>';
            } else {
                tempLineSecondSection[0] = '<div class="trace_row trace_start"><span class="code_trace">' + tempLineSecondSection[0] + '</span></div>';
            }

            tempMessage[i] = tempLineSecondSection.join('(');
        }

        return tempMessage.join("");
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Variable initialization
        this.trace = '';
        this.loadingState = false;

        // Methods execution
        this._activatedRoute.params.subscribe(params => {
            this.getTrace(params['id']);
        });

        // Construct methods
        this.__setInitPageTitle('Error trace');
    }

    /*--------- Interface imported --------*/
    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }
}