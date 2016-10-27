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
var dt_service_1 = require('../dtShared/dt.service');
var errorLog_service_1 = require('../error_log/errorLog.service');
var app_service_1 = require('../shared/services/app.service');
var ErrorLogCmp = (function () {
    /*--------- Constructor --------*/
    function ErrorLogCmp(_errorLogService, _dtService, _router, _appService) {
        this._errorLogService = _errorLogService;
        this._dtService = _dtService;
        this._router = _router;
        this._appService = _appService;
    }
    /*--------- App logic --------*/
    /**
     * Get all logs
     * @author DynTech
     */
    ErrorLogCmp.prototype.getLogRest = function () {
        var _this = this;
        this.logs = [];
        this.loadingState = true;
        this._dtService.setRestMessageContent('ErrorLogCmp', 'getLogRest()');
        this._errorLogService.getLog().toPromise().then(function (res) {
            _this.logs = res;
            _this.loadingState = false;
        }, function (error) {
            _this.loadingState = false;
        });
    };
    /**
     * Cause exception on backend and store into DB as new exception
     * @author DynTech
     */
    ErrorLogCmp.prototype.causeException = function () {
        var _this = this;
        this.loadingState = true;
        this._dtService.setRestMessageContent('ErrorLogCmp', 'causeException()');
        this._errorLogService.causeException().toPromise().then(function (res) {
            _this.loadingState = false;
        }, function (error) {
            _this.loadingState = true;
            _this.getLogRest();
        });
    };
    /**
     * Get log tracer by id
     * @author DynTech
     */
    ErrorLogCmp.prototype.selectErrorLog = function (log) {
        this._router.navigate(['error_log', log.id]);
    };
    /*--------- NgOnInit --------*/
    ErrorLogCmp.prototype.ngOnInit = function () {
        // Variable initialization
        this.logs = [];
        this.loadingState = false;
        // Methods execution
        this.getLogRest();
        // Construct methods
        this._appService.pageLoaded('Error log');
    };
    ErrorLogCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'errorLog.cmp.html',
            // styleUrls: ['errorLog.cmp.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [errorLog_service_1.ErrorLogService, dt_service_1.DTService, router_1.Router, app_service_1.AppService])
    ], ErrorLogCmp);
    return ErrorLogCmp;
}());
exports.ErrorLogCmp = ErrorLogCmp;
//# sourceMappingURL=errorLog.cmp.js.map