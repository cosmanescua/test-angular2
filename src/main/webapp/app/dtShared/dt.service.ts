import { Injectable } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { AppService } from '../shared/services/app.service';
import { BytesConverterPipe } from '../shared/pipes/bytesConverter.pipe';

import { TOKEN_COOKIE_NAME } from '../constants';
import { COMPANY_CSS_ROUTE } from '../constants';
declare var $: JQueryStatic;

@Injectable()
export class DTService {
    _bPrintMessage;

    _restMessageContent: any;

    constructor(
        private _cookieService: CookieService
    ) {

        this._restMessageContent = {
            originCmp: '',
            originMethod: '',
            message: '',
            datasize: ''
        }

        this._bPrintMessage = true;
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
     * Checks if two objects are equal
     * @author DynTech
     */
    equal(object1: any, object2): boolean {
        for (let obj1Prop in object1) {
            switch (typeof (object1[obj1Prop])) {
                case 'object':
                    if (!object1[obj1Prop].equals(object2[obj1Prop])) { return false }; break;
                case 'function':
                    if (typeof (object2[obj1Prop]) == 'undefined' || (obj1Prop != 'equals' && object1[obj1Prop].toString() != object2[obj1Prop].toString())) { return false; }; break;
                default:
                    if (object1[obj1Prop] != object2[obj1Prop]) { return false; }
            }
        }

        for (let obj2Prop in object2) {
            if (typeof (object1[obj2Prop]) == 'undefined') { return false; }
        }

        return true;
    }

    /**
     * Set company css
     * @author DynTech
     */
    setCompnayCSS(url: string): void {
        let Css = localStorage.setItem('companyCss', COMPANY_CSS_ROUTE + url);
        $('#company_css').attr('href', COMPANY_CSS_ROUTE + url);
    }

    /**
     * Set init company css
     * @author DynTech
     */
    setInitCompanyCSS(): void {
        let Css = localStorage.getItem('companyCss');
        $('#company_css').attr('href', Css);
    }

    /**
     * Set rest console message content
     * @author DynTech
     */
    setRestMessageContent(originCmp: string, originMethod: string, message?: string) {
        this._restMessageContent = {
            originCmp: originCmp,
            originMethod: originMethod,
            message: message,
            time: new Date().getTime()
        }
    }

    /**
     * Set token in cookies
     * @author DynTech
     */
    setToken(token: string): void {
        this._cookieService.put(TOKEN_COOKIE_NAME, token);
    }

    /**
     * Set token in cookies
     * @author DynTech
     */
    getToken(): string {
        return this._cookieService.get(TOKEN_COOKIE_NAME);
    }

    /**
     * Set token in cookies
     * @author DynTech
     */
    removeToken(): void {
        this._cookieService.remove(TOKEN_COOKIE_NAME);
    }

    /**
     * Print success message in console
     * @author DynTech
     */
    restConsoleMessage(url: string, method: string, code: number, success: boolean, res: any): void {
        if (this._bPrintMessage && this._restMessageContent.originCmp && this._restMessageContent.originMethod) {
            url = url.split('?')[0];

            let header = '(' + ((new Date().getTime() - this._restMessageContent.time) / 1000).toFixed(2) + 's)';
            let size = new BytesConverterPipe().transform(JSON.stringify(res).length);
            let firstRow: any = '%c ' + method + ': ' + url + ' | (' + code + ')' + ' | ' + size;
            let secondRow = '%c Origin: ' + this._restMessageContent.originCmp + ' -> ' + this._restMessageContent.originMethod;
            let thirdRow = this._restMessageContent.message ? '%c Log message: ' + this._restMessageContent.message : '';

            // Print top border
            let topBorder = '%c ';
            let longerRow = firstRow.length > secondRow.length ? firstRow : secondRow;

            let difference = (longerRow.length - 3 - header.length) / 2;
            for (let i = 0; i < Math.floor(difference); i++) {
                topBorder += '_';
            }
            topBorder += header;
            for (let i = 0; i < Math.ceil(difference); i++) {
                topBorder += '_';
            }

            if (success) {
                console.info(topBorder, 'color: #5FBA7D;');
            } else {
                console.error(topBorder, 'color: #EF2B33;');
            }


            // Print connection details and call origin
            if (success) {
                console.info(firstRow, 'color: #5FBA7D;');
                console.info(secondRow, 'color: #5FBA7D;');

            } else {
                console.error(firstRow, 'color: #EF2B33;');
                console.error(secondRow, 'color: #EF2B33;');
            }

            // Print component message (optional)
            if (thirdRow) {
                if (success) {
                    console.info(thirdRow, 'color: #5FBA7D;');
                } else {
                    console.error(thirdRow, 'color: #EF2B33;');
                }
            }
            // Print bottom border
            // let bottomBorder = '%c ';
            // for (let i = 0; i < longerRow.length - 3; i++) {
            //     bottomBorder += '\u035E ';
            // }

            // if (success) {
            //     console.info(bottomBorder, 'color: #5FBA7D;');
            // } else {
            //     console.error(bottomBorder, 'color: #EF2B33;');
            // }
        }
    }
}