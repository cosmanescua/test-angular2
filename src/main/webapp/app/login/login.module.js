System.register(['@angular/core', '../login/login.service', '../login/login.cmp', './login.routes', '../shared/modules/utility.module', '@angular/http', 'angular2-cookie/core', '../dtShared/dt.httpInterceptor'], function(exports_1, context_1) {
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
    var core_1, login_service_1, login_cmp_1, login_routes_1, utility_module_1, http_1, core_2, dt_httpInterceptor_1;
    var LoginModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (login_cmp_1_1) {
                login_cmp_1 = login_cmp_1_1;
            },
            function (login_routes_1_1) {
                login_routes_1 = login_routes_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (dt_httpInterceptor_1_1) {
                dt_httpInterceptor_1 = dt_httpInterceptor_1_1;
            }],
        execute: function() {
            LoginModule = (function () {
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
            exports_1("LoginModule", LoginModule);
        }
    }
});
//# sourceMappingURL=login.module.js.map