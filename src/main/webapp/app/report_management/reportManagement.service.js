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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var ReportManagementService = (function () {
    function ReportManagementService(_http) {
        this._http = _http;
        this._baseUrl = 'rest/';
    }
    /**
     * Retrieves all reports from database.
     * @author DynTech
     */
    ReportManagementService.prototype.getReports = function () {
        return this._http.get(this._baseUrl + 'reports').map(function (res) { return res.json(); }).catch(this.handleError);
    };
    /**
     * Saves a report into database for later use.
     * @author DynTech
     */
    ReportManagementService.prototype.addBooking = function (booking) {
        return this._http.put(this._baseUrl + 'reports/book', JSON.stringify(booking)).map(function (res) { return res; }).catch(this.handleError);
    };
    /**
     * Prints a report.
     * @author DynTech
     */
    ReportManagementService.prototype.printReport = function (reportData) {
        var params = encodeURI(JSON.stringify(reportData.amReportParameterses));
        var url = this._baseUrl + "reports/" + reportData.reportId + "/" + reportData.format + "/inline?parameters=" + params;
        return this._http.get(url, { responseType: http_1.ResponseContentType.Blob }).map(function (res) {
            return new Blob([res.blob()], { type: 'application/pdf' });
        }).catch(this.handleError);
    };
    /**
     * Handles an error.
     * @author DynTech
     */
    ReportManagementService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error || 'Server error');
    };
    ReportManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReportManagementService);
    return ReportManagementService;
}());
exports.ReportManagementService = ReportManagementService;
//# sourceMappingURL=reportManagement.service.js.map