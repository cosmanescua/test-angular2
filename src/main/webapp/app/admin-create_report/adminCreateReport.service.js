System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var AdminCreateReportService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AdminCreateReportService = (function () {
                function AdminCreateReportService(_http) {
                    this._http = _http;
                    this._baseUrl = 'rest/';
                }
                /**
                 * Create new report with given data
                 * @author DynTech
                 */
                AdminCreateReportService.prototype.createReport = function (reportProfile) {
                    return this._http.post(this._baseUrl + 'reports', JSON.stringify(reportProfile))
                        .map(function (response) { return response.json(); });
                };
                /**
                 * Handle error on service layer
                 * @author DynTech
                 */
                AdminCreateReportService.prototype.handleError = function (error) {
                    // console.error(error);
                    // return Observable.throw(error.json().error || 'Server error');
                };
                AdminCreateReportService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AdminCreateReportService);
                return AdminCreateReportService;
            }());
            exports_1("AdminCreateReportService", AdminCreateReportService);
        }
    }
});
//# sourceMappingURL=adminCreateReport.service.js.map