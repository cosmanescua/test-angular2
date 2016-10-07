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
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var AppService = (function () {
    function AppService(_http) {
        this._http = _http;
        this.languageChanged = new core_1.EventEmitter();
        this.defaultAppTitle = 'KFuture | ';
        this.defaultLanguage = 'it';
    }
    /**
     * Get default app title prefix
     * @author DynTech
     */
    AppService.prototype.getDefaultAppTitle = function () {
        return this.defaultAppTitle;
    };
    /**
     * Set default app title prefix
     * @author DynTech
     */
    AppService.prototype.setDefaultAppTitle = function (title) {
        this.defaultAppTitle = title;
    };
    /**
     * Set default app language
     * @author DynTech
     */
    AppService.prototype.getStoredLanguage = function (lang) {
        localStorage.getItem('defaultLang');
    };
    /**
     * Change language and emmit change
     * @author DynTech
     */
    AppService.prototype.changeLang = function (lang) {
        var _this = this;
        this.changeLangRest(lang).subscribe(function (result) {
            console.log('Lang changed');
            localStorage.setItem('defaultLang', lang);
            _this.defaultLanguage = lang;
            _this.languageChanged.emit(lang);
        });
    };
    /**
     * Change language - REST
     * @author DynTech
     */
    AppService.prototype.changeLangRest = function (lang) {
        return this._http.get('rest/translations/language/' + lang);
    };
    AppService = __decorate([
        core_2.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map