System.register(['@angular/core', 'angular2-cookie/core', '../login/login.model', '../login/login.service', '../dtShared/dt.service', '@angular/platform-browser'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, core_2, login_model_1, login_service_1, dt_service_1, platform_browser_1;
    var LoginCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (login_model_1_1) {
                login_model_1 = login_model_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (dt_service_1_1) {
                dt_service_1 = dt_service_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }],
        execute: function() {
            LoginCmp = (function () {
                function LoginCmp(_loginService, _cookieService, 
                    // private _translate: TranslateService,
                    _dtService, document) {
                    this._loginService = _loginService;
                    this._cookieService = _cookieService;
                    this._dtService = _dtService;
                    this.document = document;
                    this.loginModel = new login_model_1.Login('micko', 'micko');
                }
                LoginCmp.prototype.login = function () {
                    // $('#company_css').attr('href', 'mario.css');
                    // this.document.getElementById('company_css').setAttribute('href', 'app/stefan.css')
                    var _this = this;
                    this._loginService.login(this.loginModel)
                        .subscribe(function (data) {
                        _this._cookieService.put('X-Auth-Token', data.token);
                    }, function (error) { return _this.errorMessage = error; });
                };
                LoginCmp.prototype.ngOnInit = function () {
                    // this._translate.setDefaultLang('en');
                    // this._translate.use('en');
                    this.__setInitPageTitle('Login');
                };
                LoginCmp.prototype.__setInitPageTitle = function (title) {
                    this._dtService.setPageTitle(title);
                };
                LoginCmp = __decorate([
                    core_1.Component({
                        templateUrl: 'app/login/login.cmp.html',
                        // styleUrls: ['app/login/login.cmp.css'],
                        encapsulation: core_1.ViewEncapsulation.None
                    }),
                    __param(3, core_1.Inject(platform_browser_1.DOCUMENT)), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, core_2.CookieService, dt_service_1.DTService, Object])
                ], LoginCmp);
                return LoginCmp;
            }());
            exports_1("LoginCmp", LoginCmp);
        }
    }
});
//# sourceMappingURL=login.cmp.js.map