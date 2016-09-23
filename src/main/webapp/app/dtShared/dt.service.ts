import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Title } from '@angular/platform-browser';

import { AppService } from '../shared/services/app.service';

@Injectable()
export class DTService {
    static _bPrintMessage;

    static _restMessageContent: any;

    constructor(private _title: Title,
        private _appService: AppService) {

        DTService._restMessageContent = {
            originCmp: '',
            originMethod: '',
            message: ''
        }

        DTService._bPrintMessage = true;
    }

    /**
     * Set page title for the app
     * @author DynTech
     */
    setPageTitle(title: string): void {
        this._title.setTitle(this._appService.getDefaultAppTitle() + title);
    }

    /**
     * Get page title of the app
     * @author DynTech
     */
    getPageTitle(): string {
        return this._title.getTitle();
    }

    /**
     * Transform given array of objects to usable array of specific objects 
     * @author DynTech
     */
    getObjectArray(data: any): any {
        return Object.assign([], data);
    }

    /**
     * Returns copy of given object
     * @author DynTech
     */
    copy(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     * Set state variable for printing console message
     * @author DynTech
     */
    setPrintMessage(state: boolean): void {
        DTService._bPrintMessage = state;
    }

    /**
     * Set rest console message content
     * @author DynTech
     */
    setRestMessageContent(originCmp: string, originMethod: string, message?: string) {
        DTService._restMessageContent = {
            originCmp: originCmp,
            originMethod: originMethod,
            message: message
        }
    }

    /**
     * Print success message in console
     * @author DynTech
     */
    static restConsoleMessage(url: string, method: string, code: number, success: boolean): void {
        console.log('Rest message for url: ' + url);
        
        if (this._bPrintMessage) {
            console.log(method + ': ' + url + ' - ' + (success ? 'SUCCESS' : 'FAIL') + '(' + code + ')');
            console.log('Origin: ' + this._restMessageContent.originCmp + '->' + this._restMessageContent.originMethod);
            console.log('Log message: ' + this._restMessageContent.message);
        }
    }
}