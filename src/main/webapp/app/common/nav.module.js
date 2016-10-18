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
var router_1 = require('@angular/router');
var nav_cmp_1 = require('./nav.cmp');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var http_1 = require('@angular/http');
var core_2 = require('angular2-cookie/core');
var dt_httpInterceptor_1 = require('../dtShared/dt.httpInterceptor');
var utility_module_1 = require('../shared/modules/utility.module');
var globalEventManager_service_1 = require('../test-routes/globalEventManager.service');
var NavModule = (function () {
    function NavModule() {
    }
    NavModule = __decorate([
        core_1.NgModule({
            imports: [
                utility_module_1.UtilityModule,
                router_1.RouterModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'rest/translations/navigation', ''); },
                    deps: [http_1.Http]
                })
            ],
            exports: [nav_cmp_1.NavCmp],
            declarations: [nav_cmp_1.NavCmp],
            providers: [
                core_2.CookieService,
                globalEventManager_service_1.GlobalEventsManager,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, cookieService) {
                        return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, cookieService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, core_2.CookieService]
                },
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], NavModule);
    return NavModule;
}());
exports.NavModule = NavModule;
//# sourceMappingURL=nav.module.js.map