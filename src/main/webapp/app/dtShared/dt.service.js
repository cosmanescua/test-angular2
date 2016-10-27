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
var core_2 = require('angular2-cookie/core');
var bytesConverter_pipe_1 = require('../shared/pipes/bytesConverter.pipe');
var constants_1 = require('../constants');
var constants_2 = require('../constants');
var DTService = (function () {
    function DTService(_cookieService) {
        this._cookieService = _cookieService;
        this._restMessageContent = {
            originCmp: '',
            originMethod: '',
            message: '',
            datasize: ''
        };
        this._bPrintMessage = true;
    }
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
     * Checks if two objects are equal
     * @author DynTech
     */
    DTService.prototype.equal = function (object1, object2) {
        for (var obj1Prop in object1) {
            switch (typeof (object1[obj1Prop])) {
                case 'object':
                    if (!object1[obj1Prop].equals(object2[obj1Prop])) {
                        return false;
                    }
                    ;
                    break;
                case 'function':
                    if (typeof (object2[obj1Prop]) == 'undefined' || (obj1Prop != 'equals' && object1[obj1Prop].toString() != object2[obj1Prop].toString())) {
                        return false;
                    }
                    ;
                    break;
                default:
                    if (object1[obj1Prop] != object2[obj1Prop]) {
                        return false;
                    }
            }
        }
        for (var obj2Prop in object2) {
            if (typeof (object1[obj2Prop]) == 'undefined') {
                return false;
            }
        }
        return true;
    };
    /**
     * Set company css
     * @author DynTech
     */
    DTService.prototype.setCompnayCSS = function (url) {
        var Css = localStorage.setItem('companyCss', constants_2.COMPANY_CSS_ROUTE + url);
        $('#company_css').attr('href', constants_2.COMPANY_CSS_ROUTE + url);
    };
    /**
     * Set init company css
     * @author DynTech
     */
    DTService.prototype.setInitCompanyCSS = function () {
        var Css = localStorage.getItem('companyCss');
        $('#company_css').attr('href', Css);
    };
    /**
     * Set rest console message content
     * @author DynTech
     */
    DTService.prototype.setRestMessageContent = function (originCmp, originMethod, message) {
        this._restMessageContent = {
            originCmp: originCmp,
            originMethod: originMethod,
            message: message,
            time: new Date().getTime()
        };
    };
    /**
     * Set token in cookies
     * @author DynTech
     */
    DTService.prototype.setToken = function (token) {
        this._cookieService.put(constants_1.TOKEN_COOKIE_NAME, token);
    };
    /**
     * Set token in cookies
     * @author DynTech
     */
    DTService.prototype.getToken = function () {
        return this._cookieService.get(constants_1.TOKEN_COOKIE_NAME);
    };
    /**
     * Set token in cookies
     * @author DynTech
     */
    DTService.prototype.removeToken = function () {
        this._cookieService.remove(constants_1.TOKEN_COOKIE_NAME);
    };
    /**
     * Print success message in console
     * @author DynTech
     */
    DTService.prototype.restConsoleMessage = function (url, method, code, success, res) {
        if (this._bPrintMessage && this._restMessageContent.originCmp && this._restMessageContent.originMethod) {
            url = url.split('?')[0];
            var header = '(' + ((new Date().getTime() - this._restMessageContent.time) / 1000).toFixed(2) + 's)';
            var size = new bytesConverter_pipe_1.BytesConverterPipe().transform(JSON.stringify(res).length);
            var firstRow = '%c ' + method + ': ' + url + ' | (' + code + ')' + ' | ' + size;
            var secondRow = '%c Origin: ' + this._restMessageContent.originCmp + ' -> ' + this._restMessageContent.originMethod;
            var thirdRow = this._restMessageContent.message ? '%c Log message: ' + this._restMessageContent.message : '';
            // Print top border
            var topBorder = '%c ';
            var longerRow = firstRow.length > secondRow.length ? firstRow : secondRow;
            var difference = (longerRow.length - 3 - header.length) / 2;
            for (var i = 0; i < Math.floor(difference); i++) {
                topBorder += '_';
            }
            topBorder += header;
            for (var i = 0; i < Math.ceil(difference); i++) {
                topBorder += '_';
            }
            if (success) {
                console.info(topBorder, 'color: #5FBA7D;');
            }
            else {
                console.error(topBorder, 'color: #EF2B33;');
            }
            // Print connection details and call origin
            if (success) {
                console.info(firstRow, 'color: #5FBA7D;');
                console.info(secondRow, 'color: #5FBA7D;');
            }
            else {
                console.error(firstRow, 'color: #EF2B33;');
                console.error(secondRow, 'color: #EF2B33;');
            }
            // Print component message (optional)
            if (thirdRow) {
                if (success) {
                    console.info(thirdRow, 'color: #5FBA7D;');
                }
                else {
                    console.error(thirdRow, 'color: #EF2B33;');
                }
            }
        }
    };
    DTService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.CookieService])
    ], DTService);
    return DTService;
}());
exports.DTService = DTService;
//# sourceMappingURL=dt.service.js.map