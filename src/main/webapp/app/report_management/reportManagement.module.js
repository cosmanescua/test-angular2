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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var primeng_1 = require('primeng/primeng');
var reportManagement_cmp_1 = require('../report_management/reportManagement.cmp');
var reportManagement_service_1 = require('../report_management/reportManagement.service');
var validation_service_1 = require('../shared/services/validation.service');
var controlMessage_cmp_1 = require('../shared/controlMessage.cmp');
var capital_pipe_1 = require('../shared/pipes/capital.pipe');
var core_2 = require('angular2-cookie/core');
var dt_httpInterceptor_1 = require('../dtShared/dt.httpInterceptor');
var reportManagement_routes_1 = require('../report_management/reportManagement.routes');
var utility_module_1 = require('../shared/modules/utility.module');
var ReportManagementModule = (function () {
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
exports.ReportManagementModule = ReportManagementModule;
//# sourceMappingURL=reportManagement.module.js.map