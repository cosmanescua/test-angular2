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
var http_1 = require('@angular/http');
var nav_cmp_1 = require('./nav.cmp');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var dt_httpInterceptor_1 = require('../dtShared/dt.httpInterceptor');
var dt_service_1 = require('../dtShared/dt.service');
var alert_1 = require('ng2-bootstrap/components/alert');
var utility_module_1 = require('../shared/modules/utility.module');
var NavModule = (function () {
    function NavModule() {
    }
    NavModule = __decorate([
        core_1.NgModule({
            imports: [
                utility_module_1.UtilityModule,
                router_1.RouterModule,
                alert_1.AlertModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'rest/translations/navigation', ''); },
                    deps: [http_1.Http]
                })
            ],
            exports: [nav_cmp_1.NavCmp],
            declarations: [nav_cmp_1.NavCmp],
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, dtService) {
                        return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, dtService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, dt_service_1.DTService]
                }
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], NavModule);
    return NavModule;
}());
exports.NavModule = NavModule;
//# sourceMappingURL=nav.module.js.map