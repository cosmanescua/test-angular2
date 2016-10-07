import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Title } from '@angular/platform-browser';

import { AppService } from '../shared/services/app.service';

import { BytesConverterPipe } from '../shared/pipes/bytesConverter.pipe';

import { COMPANY_CSS_ROUTE } from '../constants';
declare var $: JQueryStatic;

@Injectable()
export class DTService {
    static _bPrintMessage;

    static _restMessageContent: any;

    constructor(private _title: Title,
        private _appService: AppService) {

        DTService._restMessageContent = {
            originCmp: '',
            originMethod: '',
            message: '',
            dataSize: ''
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
     * Set company css
     * @author DynTech
     */
    setCompnayCSS(url: string): void {
        let tempCss = localStorage.setItem('companyCss', COMPANY_CSS_ROUTE + url);
        $('#company_css').attr('href', COMPANY_CSS_ROUTE + url);
    }

    /**
     * Set init company css
     * @author DynTech
     */
    setInitCompanyCSS(): void {
        let tempCss = localStorage.getItem('companyCss');
        $('#company_css').attr('href', tempCss);
    }

    /**
     * Set rest console message content
     * @author DynTech
     */
    setRestMessageContent(originCmp: string, originMethod: string, message?: string) {
        DTService._restMessageContent = {
            originCmp: originCmp,
            originMethod: originMethod,
            message: message,
            time: new Date().getTime()
        }
    }

    /**
     * Print success message in console
     * @author DynTech
     */
    static restConsoleMessage(url: string, method: string, code: number, success: boolean, result: any): void {
        if (this._bPrintMessage && this._restMessageContent.originCmp && this._restMessageContent.originMethod) {
            url = url.split('?')[0];

            let tempHeader = 'REST(' + ((new Date().getTime() - this._restMessageContent.time) / 1000).toFixed(2) + 's)';
            let tempSize = new BytesConverterPipe().transform(JSON.stringify(result).length);
            let tempFirstRow: any = '%c ' + method + ': ' + url + ' - ' + (success ? 'SUCCESS' : 'FAIL') + '(' + code + ')' + ' - Size: ' + tempSize;
            let tempSecondRow = '%c Origin: ' + this._restMessageContent.originCmp + ' -> ' + this._restMessageContent.originMethod;
            let tempThirdRow = this._restMessageContent.message ? '%c Log message: ' + this._restMessageContent.message : '';

            // Print top border
            let tempTopBorder = '%c ';
            let tempDifference = (tempFirstRow.length - 3 - tempHeader.length) / 2;
            for (let i = 0; i < Math.floor(tempDifference); i++) {
                tempTopBorder += '_';
            }
            tempTopBorder += tempHeader;
            for (let i = 0; i < Math.ceil(tempDifference); i++) {
                tempTopBorder += '_';
            }

            if (success) {
                console.info(tempTopBorder, 'color: #5FBA7D;');
            } else {
                console.error(tempTopBorder, 'color: #EF2B33;');
            }


            // Print connection details and call origin
            if (success) {
                console.info(tempFirstRow, 'color: #5FBA7D;');
                console.info(tempSecondRow, 'color: #5FBA7D;');

            } else {
                console.error(tempFirstRow, 'color: #EF2B33;');
                console.error(tempSecondRow, 'color: #EF2B33;');
            }

            // Print component message (optional)
            if (tempThirdRow) {
                if (success) {
                    console.info(tempThirdRow, 'color: #5FBA7D;');
                } else {
                    console.error(tempThirdRow, 'color: #EF2B33;');
                }
            }

            // Print bottom border
            let tempBottomBorder = '%c ';            
            for (let i = 0; i < tempFirstRow.length - 3; i++) {
                tempBottomBorder += '\u035E ';
            }

            if (success) {
                console.info(tempBottomBorder, 'color: #5FBA7D;');
            } else {
                console.error(tempBottomBorder, 'color: #EF2B33;');
            }
        }
    }
}