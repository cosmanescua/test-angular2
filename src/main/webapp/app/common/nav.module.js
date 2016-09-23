System.register(['@angular/core', '@angular/router', './nav.cmp', 'ng2-translate/ng2-translate', '@angular/http', 'angular2-cookie/core', '../dtShared/dt.httpInterceptor', '../shared/modules/utility.module'], function(exports_1, context_1) {
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
    var core_1, router_1, nav_cmp_1, ng2_translate_1, http_1, core_2, dt_httpInterceptor_1, utility_module_1;
    var NavModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (nav_cmp_1_1) {
                nav_cmp_1 = nav_cmp_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (dt_httpInterceptor_1_1) {
                dt_httpInterceptor_1 = dt_httpInterceptor_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            }],
        execute: function() {
            NavModule = (function () {
                function NavModule() {
                }
                NavModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            utility_module_1.UtilityModule,
                            router_1.RouterModule,
                            ng2_translate_1.TranslateModule.forRoot({
                                provide: ng2_translate_1.TranslateLoader,
                                useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'app/assets/i18n/', '.json'); },
                                deps: [http_1.Http]
                            })
                        ],
                        exports: [nav_cmp_1.NavCmp],
                        declarations: [nav_cmp_1.NavCmp],
                        providers: [
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
            exports_1("NavModule", NavModule);
        }
    }
});
//# sourceMappingURL=nav.module.js.map