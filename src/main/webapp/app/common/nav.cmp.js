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
var dt_service_1 = require('../dtShared/dt.service');
var core_2 = require('angular2-cookie/core');
var globalEventManager_service_1 = require('../test-routes/globalEventManager.service');
var authentication_service_1 = require('../test-routes/authentication.service');
var NavCmp = (function () {
    /*--------- Constructor --------*/
    function NavCmp(_translate, _appService, _dtService, _cookieService, _globalEventsManager, _authenticationService) {
        // translate.setDefaultLang('prevod1');
        this._translate = _translate;
        this._appService = _appService;
        this._dtService = _dtService;
        this._cookieService = _cookieService;
        this._globalEventsManager = _globalEventsManager;
        this._authenticationService = _authenticationService;
        this.onTranslationChange = new core_1.EventEmitter();
        //this flag is used for conditionally display some items in the navigation bar - sections that must be available only for admin
        this.isAdminUser = false;
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use('prevod1');
        this._dtService.setInitCompanyCSS();
        this._globalEventsManager.showNavBar.subscribe(function (mode) {
            console.log("event emitted");
        });
    }
    /*--------- App logic --------*/
    NavCmp.prototype.matchDefaultLanguage = function (lang) {
        return lang == this._appService.defaultLanguage;
    };
    NavCmp.prototype.changeLanguage = function (lang) {
        this._appService.changeLang(lang);
        // this._translate.use('');
    };
    NavCmp.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('NG on init');
        this.state = true;
        this._translate.use('it');
        this._appService.languageChanged.subscribe(function (lang) {
            console.log(lang);
            _this._translate.use(lang);
            // this.state = false;
            // setInterval(() => {
            //     this.state = true;
            // })
        });
        // this._appService.titleChanged.subscribe(lang => console.log(lang));
    };
    //verify if the current user logged in has permissions fo the routes
    NavCmp.prototype.checkPermission = function (route) {
        return this._authenticationService.checkPermission(route);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NavCmp.prototype, "onTranslationChange", void 0);
    NavCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigation-menu',
            templateUrl: 'nav.cmp.html',
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, app_service_1.AppService, dt_service_1.DTService, core_2.CookieService, globalEventManager_service_1.GlobalEventsManager, authentication_service_1.AuthenticationService])
    ], NavCmp);
    return NavCmp;
}());
exports.NavCmp = NavCmp;
//# sourceMappingURL=nav.cmp.js.map