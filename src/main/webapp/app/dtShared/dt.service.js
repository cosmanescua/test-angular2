System.register(['@angular/core', '@angular/platform-browser', '../shared/services/app.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, app_service_1;
    var DTService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            DTService = (function () {
                function DTService(_title, _appService) {
                    this._title = _title;
                    this._appService = _appService;
                    DTService._restMessageContent = {
                        originCmp: '',
                        originMethod: '',
                        message: ''
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
                 * Set rest console message content
                 * @author DynTech
                 */
                DTService.prototype.setRestMessageContent = function (originCmp, originMethod, message) {
                    DTService._restMessageContent = {
                        originCmp: originCmp,
                        originMethod: originMethod,
                        message: message
                    };
                };
                /**
                 * Print success message in console
                 * @author DynTech
                 */
                DTService.restConsoleMessage = function (url, method, code, success) {
                    console.log('Rest message for url: ' + url);
                    if (this._bPrintMessage) {
                        console.log(method + ': ' + url + ' - ' + (success ? 'SUCCESS' : 'FAIL') + '(' + code + ')');
                        console.log('Origin: ' + this._restMessageContent.originCmp + '->' + this._restMessageContent.originMethod);
                        console.log('Log message: ' + this._restMessageContent.message);
                    }
                };
                DTService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [platform_browser_1.Title, app_service_1.AppService])
                ], DTService);
                return DTService;
            }());
            exports_1("DTService", DTService);
        }
    }
});
//# sourceMappingURL=dt.service.js.map