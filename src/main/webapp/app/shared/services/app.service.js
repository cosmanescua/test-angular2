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
var platform_browser_1 = require('@angular/platform-browser');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var models_1 = require('../models');
var dt_service_1 = require('../../dtShared/dt.service');
var auth_service_1 = require('./auth.service');
var AppService = (function () {
    function AppService(_http, _traslateService, _title, _dtService, _authService) {
        this._http = _http;
        this._traslateService = _traslateService;
        this._title = _title;
        this._dtService = _dtService;
        this._authService = _authService;
        this.languageChanged = new core_1.EventEmitter();
        this.navLanguageChanged = new core_1.EventEmitter();
        this.defaultAppTitle = 'KFuture | ';
        this.defaultLanguage = this.getStoredLanguage() || 'en';
        AppService.bLanguageLoading = false;
        this.userProfile = new models_1.UserProfile();
        this.initModuleLoaded = false;
        this.postLoginLoad = false;
        AppService.defaultPage = 'home';
    }
    /**
     * Get loading state of chaning language
     * @author DynTech
     */
    AppService.prototype.getBLanguageLoading = function () {
        return AppService.bLanguageLoading;
    };
    /**
     * Set default app language
     * @author DynTech
     */
    AppService.prototype.getStoredLanguage = function () {
        return localStorage.getItem('defaultLang');
    };
    /**
     * Set default app language
     * @author DynTech
     */
    AppService.prototype.setStoredLanguage = function (lang) {
        this.defaultLanguage = lang;
        localStorage.setItem('defaultLang', lang);
    };
    /**
     * Set router from component for interceptor
     * @author DynTech
     */
    AppService.prototype.setRouter = function (router) {
        AppService.router = router;
    };
    /**
     * Method to be executed when page is loaded
     * @author DynTech
     */
    AppService.prototype.pageLoaded = function (title, isLogin) {
        this._title.setTitle(this.defaultAppTitle + title);
        if (!isLogin) {
            this._dtService.setInitCompanyCSS();
            this.initModuleLoaded = true;
        }
    };
    /**
     * Change language and emmit change
     * @author DynTech
     */
    AppService.prototype.changeLang = function (lang) {
        var _this = this;
        AppService.bLanguageLoading = true;
        this.changeLangRest(lang).toPromise().then(function () {
            localStorage.setItem('defaultLang', lang);
            _this.defaultLanguage = lang;
            AppService.bLanguageLoading = false;
            _this.languageChanged.emit(lang);
            _this.navLanguageChanged.emit(lang);
        });
    };
    /**
     * Change languge by using translate reference from component with give lang
     * @author DynTech
     */
    AppService.prototype.changeLangTranslate = function (translate, lang, bDontEmit) {
        AppService.bLanguageLoading = true;
        translate.use(lang).subscribe(function () {
            AppService.bLanguageLoading = false;
            if (!bDontEmit) {
                AppService.languageChangeCompleted();
            }
        }, function (err) {
            AppService.bLanguageLoading = false;
        });
    };
    /**
     * Emit translation completion
     * @author DynTech
     */
    AppService.languageChangeCompleted = function () {
        AppService.languageChangeCompletedEmit.emit();
    };
    /**
     * Unsubscribe from event emitters onDestroy component
     * @author DynTech
     */
    AppService.prototype.refreshEmitters = function (refreshNav) {
        AppService.languageChangeCompletedEmit.unsubscribe();
        this.languageChanged.unsubscribe();
        AppService.languageChangeCompletedEmit = new core_1.EventEmitter();
        this.languageChanged = new core_1.EventEmitter();
        if (refreshNav) {
            this.navLanguageChanged.unsubscribe();
            this.navLanguageChanged = new core_1.EventEmitter();
        }
    };
    /**
     * Change language - REST
     * @author DynTech
     */
    AppService.prototype.changeLangRest = function (lang) {
        return this._http.get('rest/translations/language/' + lang);
    };
    /**
     * Converting retrieved routes from init or getUser to array of routes
     * @author DynTech
     */
    AppService.prototype.convertRoutesToObjects = function (userInfo) {
        var __routes = {};
        for (var _i = 0, _a = userInfo.userRoutes; _i < _a.length; _i++) {
            var route = _a[_i];
            __routes[route.url] = true;
        }
        return __routes;
    };
    AppService.languageChangeCompletedEmit = new core_1.EventEmitter();
    AppService = __decorate([
        core_2.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_translate_1.TranslateService, platform_browser_1.Title, dt_service_1.DTService, auth_service_1.AuthService])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map