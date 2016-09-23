System.register(['@angular/core', '@angular/http', 'angular2-cookie/core', 'ng2-dragula/ng2-dragula', 'ng2-bootstrap/ng2-bootstrap', 'ng2-translate/ng2-translate', '../admin-create_report/adminCreateReport.cmp', '../admin-create_report/adminCreateReport.service', '../shared/pipes/bytesConverter.pipe', '../shared/pipes/shortText.pipe', '../shared/pipes/fileExtensionTrimmer.pipe', '../dtShared/dt.httpInterceptor', './adminCreateReport.routes', '../shared/modules/utility.module'], function(exports_1, context_1) {
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
    var core_1, http_1, core_2, ng2_dragula_1, ng2_bootstrap_1, ng2_translate_1, adminCreateReport_cmp_1, adminCreateReport_service_1, bytesConverter_pipe_1, shortText_pipe_1, fileExtensionTrimmer_pipe_1, dt_httpInterceptor_1, adminCreateReport_routes_1, utility_module_1;
    var AdminCreateReportModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (adminCreateReport_cmp_1_1) {
                adminCreateReport_cmp_1 = adminCreateReport_cmp_1_1;
            },
            function (adminCreateReport_service_1_1) {
                adminCreateReport_service_1 = adminCreateReport_service_1_1;
            },
            function (bytesConverter_pipe_1_1) {
                bytesConverter_pipe_1 = bytesConverter_pipe_1_1;
            },
            function (shortText_pipe_1_1) {
                shortText_pipe_1 = shortText_pipe_1_1;
            },
            function (fileExtensionTrimmer_pipe_1_1) {
                fileExtensionTrimmer_pipe_1 = fileExtensionTrimmer_pipe_1_1;
            },
            function (dt_httpInterceptor_1_1) {
                dt_httpInterceptor_1 = dt_httpInterceptor_1_1;
            },
            function (adminCreateReport_routes_1_1) {
                adminCreateReport_routes_1 = adminCreateReport_routes_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            }],
        execute: function() {
            AdminCreateReportModule = (function () {
                function AdminCreateReportModule() {
                }
                AdminCreateReportModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            ng2_bootstrap_1.TooltipModule,
                            utility_module_1.UtilityModule,
                            adminCreateReport_routes_1.ROUTING,
                            ng2_dragula_1.DragulaModule,
                            http_1.HttpModule,
                            ng2_translate_1.TranslateModule.forRoot({
                                provide: ng2_translate_1.TranslateLoader,
                                useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'app/assets/i18n/', '.json'); },
                                deps: [http_1.Http]
                            })
                        ],
                        declarations: [
                            adminCreateReport_cmp_1.AdminCreateReportCmp,
                            bytesConverter_pipe_1.BytesConverterPipe,
                            shortText_pipe_1.ShortTextPipe,
                            fileExtensionTrimmer_pipe_1.FileExtensionTrimmer
                        ],
                        providers: [
                            ng2_dragula_1.DragulaService,
                            adminCreateReport_service_1.AdminCreateReportService,
                            {
                                provide: http_1.Http,
                                useFactory: function (backend, defaultOptions, cookieService) {
                                    return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, cookieService);
                                },
                                deps: [http_1.XHRBackend, http_1.RequestOptions, core_2.CookieService]
                            }
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdminCreateReportModule);
                return AdminCreateReportModule;
            }());
            exports_1("AdminCreateReportModule", AdminCreateReportModule);
        }
    }
});
//# sourceMappingURL=adminCreateReport.module.js.map