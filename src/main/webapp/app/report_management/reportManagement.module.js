System.register(['@angular/core', '@angular/forms', '@angular/http', 'primeng/primeng', '../report_management/reportManagement.cmp', '../report_management/reportManagement.service', '../shared/services/validation.service', '../shared/controlMessage.cmp', '../shared/pipes/capital.pipe', 'angular2-cookie/core', '../dtShared/dt.httpInterceptor', '../report_management/reportManagement.routes', '../shared/modules/utility.module'], function(exports_1, context_1) {
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
    var core_1, forms_1, http_1, primeng_1, reportManagement_cmp_1, reportManagement_service_1, validation_service_1, controlMessage_cmp_1, capital_pipe_1, core_2, dt_httpInterceptor_1, reportManagement_routes_1, utility_module_1;
    var ReportManagementModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (reportManagement_cmp_1_1) {
                reportManagement_cmp_1 = reportManagement_cmp_1_1;
            },
            function (reportManagement_service_1_1) {
                reportManagement_service_1 = reportManagement_service_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (controlMessage_cmp_1_1) {
                controlMessage_cmp_1 = controlMessage_cmp_1_1;
            },
            function (capital_pipe_1_1) {
                capital_pipe_1 = capital_pipe_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (dt_httpInterceptor_1_1) {
                dt_httpInterceptor_1 = dt_httpInterceptor_1_1;
            },
            function (reportManagement_routes_1_1) {
                reportManagement_routes_1 = reportManagement_routes_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            }],
        execute: function() {
            ReportManagementModule = (function () {
                function ReportManagementModule() {
                }
                ReportManagementModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            forms_1.ReactiveFormsModule,
                            primeng_1.CalendarModule,
                            primeng_1.DataScrollerModule,
                            primeng_1.GrowlModule,
                            primeng_1.MessagesModule,
                            primeng_1.SelectButtonModule,
                            reportManagement_routes_1.ROUTING,
                            utility_module_1.UtilityModule
                        ],
                        declarations: [
                            reportManagement_cmp_1.ReportManagementCmp,
                            capital_pipe_1.CapitalPipe,
                            controlMessage_cmp_1.ControlMessages
                        ],
                        providers: [
                            reportManagement_service_1.ReportManagementService,
                            validation_service_1.ValidationService,
                            forms_1.Validators,
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
                ], ReportManagementModule);
                return ReportManagementModule;
            }());
            exports_1("ReportManagementModule", ReportManagementModule);
        }
    }
});
//# sourceMappingURL=reportManagement.module.js.map