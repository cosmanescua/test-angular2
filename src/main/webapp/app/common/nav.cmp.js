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
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var app_service_1 = require('../shared/services/app.service');
var auth_service_1 = require('../shared/services/auth.service');
var dt_service_1 = require('../dtShared/dt.service');
var NavCmp = (function () {
    /*--------- Constructor --------*/
    function NavCmp(_translateService, _appService, _dtService, _authService) {
        this._translateService = _translateService;
        this._appService = _appService;
        this._dtService = _dtService;
        this._authService = _authService;
    }
    /*--------- App logic --------*/
    /**
     * Change language on flag click
     * @author DynTech
     */
    NavCmp.prototype.changeLanguage = function (lang) {
        this._appService.changeLang(lang);
    };
    /**
     * REST - Login authentication with token returned as data
     * @author DynTech
     */
    NavCmp.prototype.logout = function () {
        var _this = this;
        this.logoutLoading = true;
        this._authService.logout().toPromise().then(function (res) {
            auth_service_1.AuthService.clearAuth();
            _this.logoutLoading = false;
            _this._authService.redirectUrl = '';
        }, function (error) {
            console.log('LOGIN FAILED');
            _this.logoutLoading = false;
        });
    };
    /**
     * Check if logged in user can see given route
     * @author DynTech
     */
    NavCmp.prototype.checkRoute = function (route) {
        return this._authService.userRoutes[route];
    };
    /*--------- Utility ---------*/
    /**
     * Match default language for click prevention
     * @author DynTech
     */
    NavCmp.prototype.matchDefaultLanguage = function (lang) {
        return lang == this._appService.defaultLanguage;
    };
    /*--------- NG On Init ---------*/
    NavCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.logoutLoading = false;
        this._translateService.use(this._appService.getStoredLanguage());
        this._appService.navLanguageChanged.subscribe(function (lang) {
            _this._appService.changeLangTranslate(_this._translateService, lang);
        });
        this._dtService.setInitCompanyCSS();
    };
    NavCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(true);
    };
    NavCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigation-menu',
            templateUrl: 'nav.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, app_service_1.AppService, dt_service_1.DTService, auth_service_1.AuthService])
    ], NavCmp);
    return NavCmp;
}());
exports.NavCmp = NavCmp;
//# sourceMappingURL=nav.cmp.js.map