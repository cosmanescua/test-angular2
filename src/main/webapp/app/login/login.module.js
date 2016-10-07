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
var login_service_1 = require('../login/login.service');
var login_cmp_1 = require('../login/login.cmp');
var login_routes_1 = require('./login.routes');
var utility_module_1 = require('../shared/modules/utility.module');
var http_1 = require('@angular/http');
var core_2 = require('angular2-cookie/core');
var dt_httpInterceptor_1 = require('../dtShared/dt.httpInterceptor');
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                login_routes_1.ROUTING,
                utility_module_1.UtilityModule
            ],
            declarations: [
                login_cmp_1.LoginCmp
            ],
            providers: [
                login_service_1.LoginService,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, cookieService, dtService) {
                        return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, cookieService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, core_2.CookieService]
                },
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map