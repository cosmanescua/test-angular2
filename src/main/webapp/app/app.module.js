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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
// Custom Components
var app_cmp_1 = require('./app.cmp'); // Main cmp
var nav_module_1 = require('./common/nav.module');
var utility_module_1 = require('./shared/modules/utility.module');
var auth_service_1 = require('./shared/services/auth.service');
var app_service_1 = require('./shared/services/app.service');
var dt_service_1 = require('./dtShared/dt.service');
var dt_httpInterceptor_1 = require('./dtShared/dt.httpInterceptor');
var authGuard_1 = require('./authGuard');
var login_authGuard_1 = require('./login/login.authGuard');
var home_guard_1 = require('./home/home.guard');
var app_routes_1 = require('./app.routes');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                nav_module_1.NavModule,
                app_routes_1.ROUTING,
                utility_module_1.UtilityModule,
            ],
            declarations: [
                app_cmp_1.AppCmp
            ],
            bootstrap: [app_cmp_1.AppCmp],
            providers: [
                authGuard_1.AuthGuard,
                login_authGuard_1.LoginAuthGuard,
                home_guard_1.HomeAuthGuard,
                auth_service_1.AuthService,
                app_service_1.AppService,
                {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                },
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, dtService) {
                        return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, dtService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, dt_service_1.DTService]
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map