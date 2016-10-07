"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_service_1 = require('../shared/services/app.service');
var bytesConverter_pipe_1 = require('../shared/pipes/bytesConverter.pipe');
var constants_1 = require('../constants');
var DTService = (function () {
    function DTService(_title, _appService) {
        this._title = _title;
        this._appService = _appService;
        DTService._restMessageContent = {
            originCmp: '',
            originMethod: '',
            message: '',
            dataSize: ''
        };
        DTService._bPrintMessage = true;
    }
    /**
     * Set page title for the app
     * @author DynTech
     */
    DTService.prototype.setPageTitle = function (title) {
        this._title.setTitle(this._appService.getDefaultAppTitle() + title);
    };
    /**
     * Get page title of the app
     * @author DynTech
     */
    DTService.prototype.getPageTitle = function () {
        return this._title.getTitle();
    };
    /**
     * Transform given array of objects to usable array of specific objects
     * @author DynTech
     */
    DTService.prototype.getObjectArray = function (data) {
        return Object.assign([], data);
    };
    /**
     * Returns copy of given object
     * @author DynTech
     */
    DTService.prototype.copy = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    /**
     * Set state variable for printing console message
     * @author DynTech
     */
    DTService.prototype.setPrintMessage = function (state) {
        DTService._bPrintMessage = state;
    };
    /**
     * Set company css
     * @author DynTech
     */
    DTService.prototype.setCompnayCSS = function (url) {
        var tempCss = localStorage.setItem('companyCss', constants_1.COMPANY_CSS_ROUTE + url);
        $('#company_css').attr('href', constants_1.COMPANY_CSS_ROUTE + url);
    };
    /**
     * Set init company css
     * @author DynTech
     */
    DTService.prototype.setInitCompanyCSS = function () {
        var tempCss = localStorage.getItem('companyCss');
        $('#company_css').attr('href', tempCss);
    };
    /**
     * Set rest console message content
     * @author DynTech
     */
    DTService.prototype.setRestMessageContent = function (originCmp, originMethod, message) {
        DTService._restMessageContent = {
            originCmp: originCmp,
            originMethod: originMethod,
            message: message,
            time: new Date().getTime()
        };
    };
    /**
     * Print success message in console
     * @author DynTech
     */
    DTService.restConsoleMessage = function (url, method, code, success, result) {
        if (this._bPrintMessage && this._restMessageContent.originCmp && this._restMessageContent.originMethod) {
            url = url.split('?')[0];
            var tempHeader = 'REST(' + ((new Date().getTime() - this._restMessageContent.time) / 1000).toFixed(2) + 's)';
            var tempSize = new bytesConverter_pipe_1.BytesConverterPipe().transform(JSON.stringify(result).length);
            var tempFirstRow = '%c ' + method + ': ' + url + ' - ' + (success ? 'SUCCESS' : 'FAIL') + '(' + code + ')' + ' - Size: ' + tempSize;
            var tempSecondRow = '%c Origin: ' + this._restMessageContent.originCmp + ' -> ' + this._restMessageContent.originMethod;
            var tempThirdRow = this._restMessageContent.message ? '%c Log message: ' + this._restMessageContent.message : '';
            // Print top border
            var tempTopBorder = '%c ';
            var tempDifference = (tempFirstRow.length - 3 - tempHeader.length) / 2;
            for (var i = 0; i < Math.floor(tempDifference); i++) {
                tempTopBorder += '_';
            }
            tempTopBorder += tempHeader;
            for (var i = 0; i < Math.ceil(tempDifference); i++) {
                tempTopBorder += '_';
            }
            if (success) {
                console.info(tempTopBorder, 'color: #5FBA7D;');
            }
            else {
                console.error(tempTopBorder, 'color: #EF2B33;');
            }
            // Print connection details and call origin
            if (success) {
                console.info(tempFirstRow, 'color: #5FBA7D;');
                console.info(tempSecondRow, 'color: #5FBA7D;');
            }
            else {
                console.error(tempFirstRow, 'color: #EF2B33;');
                console.error(tempSecondRow, 'color: #EF2B33;');
            }
            // Print component message (optional)
            if (tempThirdRow) {
                if (success) {
                    console.info(tempThirdRow, 'color: #5FBA7D;');
                }
                else {
                    console.error(tempThirdRow, 'color: #EF2B33;');
                }
            }
            // Print bottom border
            var tempBottomBorder = '%c ';
            for (var i = 0; i < tempFirstRow.length - 3; i++) {
                tempBottomBorder += '\u035E ';
            }
            if (success) {
                console.info(tempBottomBorder, 'color: #5FBA7D;');
            }
            else {
                console.error(tempBottomBorder, 'color: #EF2B33;');
            }
        }
    };
    DTService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [platform_browser_1.Title, app_service_1.AppService])
    ], DTService);
    return DTService;
}());
exports.DTService = DTService;
//# sourceMappingURL=dt.service.js.map