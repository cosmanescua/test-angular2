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
// import {TRANSLATE_PROVIDERS, TranslatePipe, TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';
var userLogin_model_1 = require('../login/userLogin.model');
var login_service_1 = require('../login/login.service');
var dt_service_1 = require('../dtShared/dt.service');
var app_service_1 = require('../shared/services/app.service');
var globalEventManager_service_1 = require('../test-routes/globalEventManager.service');
var authentication_service_1 = require('../test-routes/authentication.service');
var LoginCmp = (function () {
    /*--------- Constructor --------*/
    function LoginCmp(_loginService, _cookieService, _dtService, _appService, _globalEventManager, _authenticationService) {
        this._loginService = _loginService;
        this._cookieService = _cookieService;
        this._dtService = _dtService;
        this._appService = _appService;
        this._globalEventManager = _globalEventManager;
        this._authenticationService = _authenticationService;
        this.loginModel = new userLogin_model_1.UserLogin('micko', 'micko');
    }
    /*--------- App logic --------*/
    /**
     * REST - Login authentication with token returned as data
     * @author DynTech
     */
    LoginCmp.prototype.login = function () {
        var _this = this;
        this.bLoginState = false;
        this.bLoginSuccessful = false;
        this.bLoadingState = true;
        this._dtService.setRestMessageContent('LoginCmp', 'login()');
        this._loginService.login(this.loginModel)
            .subscribe(function (data) {
            _this._cookieService.put('X-Auth-Token', data.token);
            _this.getUserRest();
        });
    };
    /**
     * REST - Get user information based on token retrived previously
     * @author DynTech
     */
    LoginCmp.prototype.getUserRest = function () {
        var _this = this;
        this._dtService.setRestMessageContent('LoginCmp', 'getUserRest()');
        this._loginService.getUser().subscribe(function (result) {
            var tempIterator = 0;
            for (var company in result.companies) {
                var tempOption = {
                    companyName: company,
                    cssFile: result.cssStyles[tempIterator]
                };
                _this.aCssList.push(tempOption);
                tempIterator++;
            }
            if (_this.aCssList.length == 1) {
                _this.selectCompany(_this.aCssList[0].cssFile);
            }
            _this.bLoginState = true;
            _this.bLoginSuccessful = true;
            _this.bLoadingState = false;
            console.log(result);
            authentication_service_1.AuthenticationService.setUserPermissions(result.username, result.userRoutes);
            _this._globalEventManager.showNavBar.emit(true);
        }, function (error) {
            _this.bLoginState = true;
            _this.bLoginSuccessful = false;
            _this.bLoadingState = false;
        });
    };
    /**
     * Select company panel style
     * @author DynTech
     */
    LoginCmp.prototype.selectCompany = function (selectedCompany, multicompany) {
        if (selectedCompany.indexOf('/')) {
            selectedCompany = selectedCompany.split('/')[1];
        }
        this._dtService.setCompnayCSS(selectedCompany);
        if (multicompany) {
            this.bLoginState = false;
            this.bLoginSuccessful = false;
        }
        this.bLoadingState = false;
        authentication_service_1.AuthenticationService.isLoggedIn = true;
        this.aCssList = [];
        this.selectedCompany = '';
    };
    /*--------- NgOnInit --------*/
    LoginCmp.prototype.ngOnInit = function () {
        // Variable initialization
        this.bLoginState = false;
        this.bLoginSuccessful = false;
        this.bLoadingState = false;
        this.aCssList = [];
        this.selectedCompany = '';
        // this._translate.setDefaultLang('en');
        // this._translate.use('en');
        // Construct methods
        this.__setInitPageTitle('Login');
    };
    /*--------- Interface imported --------*/
    LoginCmp.prototype.__setInitPageTitle = function (title) {
        this._dtService.setPageTitle(title);
    };
    LoginCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.cmp.html',
            // styleUrls: ['app/login/login.cmp.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, core_2.CookieService, dt_service_1.DTService, app_service_1.AppService, globalEventManager_service_1.GlobalEventsManager, authentication_service_1.AuthenticationService])
    ], LoginCmp);
    return LoginCmp;
}());
exports.LoginCmp = LoginCmp;
//# sourceMappingURL=login.cmp.js.map