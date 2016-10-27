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
var userLogin_model_1 = require('../login/userLogin.model');
var login_service_1 = require('../login/login.service');
var dt_service_1 = require('../dtShared/dt.service');
var app_service_1 = require('../shared/services/app.service');
var auth_service_1 = require('../shared/services/auth.service');
var LoginCmp = (function () {
    /*--------- Constructor --------*/
    function LoginCmp(_loginService, _dtService, _appService, _authService) {
        this._loginService = _loginService;
        this._dtService = _dtService;
        this._appService = _appService;
        this._authService = _authService;
        this.loginModel = new userLogin_model_1.UserLogin('', '');
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
        this._authService.login(this.loginModel).toPromise().then(function (res) {
            _this.token = res.json().token;
            _this._dtService.setToken(_this.token);
            _this.getUserRest();
        }, function (error) {
            auth_service_1.AuthService.clearAuth();
            _this.bLoginState = true;
            _this.bLoginSuccessful = false;
            _this.bLoadingState = false;
        });
    };
    /**
     * REST - Get user information based on token retrived previously
     * @author DynTech
     */
    LoginCmp.prototype.getUserRest = function () {
        var _this = this;
        this._dtService.setRestMessageContent('LoginCmp', 'getUserRest()');
        this._loginService.getUser().toPromise().then(function (res) {
            var tempIterator = 0;
            _this.token = _this._dtService.getToken();
            _this._dtService.removeToken();
            for (var company in res.companies) {
                var tempOption = {
                    companyName: company,
                    cssFile: res.cssStyles[tempIterator]
                };
                _this.aCssList.push(tempOption);
                tempIterator++;
            }
            if (_this.aCssList.length == 0) {
                _this.selectCompany('');
            }
            else if (_this.aCssList.length == 1) {
                _this.selectCompany(_this.aCssList[0].cssFile);
            }
            _this._authService.userRoutes = _this._appService.convertRoutesToObjects(res);
            _this._appService.userProfile.userName = res.username;
            _this._appService.setStoredLanguage(res.defaultLanguage);
            _this.bLoginState = true;
            _this.bLoginSuccessful = true;
            _this.bLoadingState = false;
        }, function (error) {
            auth_service_1.AuthService.clearAuth();
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
        if (selectedCompany) {
            if (selectedCompany.indexOf('/')) {
                selectedCompany = selectedCompany.split('/')[1];
            }
            this._dtService.setCompnayCSS(selectedCompany);
        }
        if (multicompany) {
            this.bLoginState = false;
            this.bLoginSuccessful = false;
        }
        this._dtService.setToken(this.token);
        this.bLoadingState = false;
        this._appService.postLoginLoad = true;
        auth_service_1.AuthService.bLoginStatus = true;
        var redirectUrlTemp = this._authService.redirectUrl ? this._authService.redirectUrl : app_service_1.AppService.defaultPage;
        app_service_1.AppService.router.navigate([redirectUrlTemp]);
        this.aCssList = [];
        this.selectedCompany = '';
    };
    /*--------- NgOnInit --------*/
    LoginCmp.prototype.ngOnInit = function () {
        // Variable initialization
        this.bLoginState = false;
        this.bLoginSuccessful = false;
        this.bLoadingState = false;
        this._appService.postLoginLoad = false;
        this.aCssList = [];
        this.selectedCompany = '';
        // Construct methods
        this._appService.pageLoaded('Login', true);
    };
    LoginCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.cmp.html',
            // styleUrls: ['app/login/login.cmp.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, dt_service_1.DTService, app_service_1.AppService, auth_service_1.AuthService])
    ], LoginCmp);
    return LoginCmp;
}());
exports.LoginCmp = LoginCmp;
//# sourceMappingURL=login.cmp.js.map