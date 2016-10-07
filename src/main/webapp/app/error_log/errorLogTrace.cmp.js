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
var errorLog_service_1 = require('./errorLog.service');
var dt_service_1 = require('../dtShared/dt.service');
var ErrorLogTraceCmp = (function () {
    /*--------- Constructor --------*/
    function ErrorLogTraceCmp(_errorLogService, _dtService, _activatedRoute) {
        this._errorLogService = _errorLogService;
        this._dtService = _dtService;
        this._activatedRoute = _activatedRoute;
    }
    /*------------- App logic ------------*/
    /**
     * Get all logs in list
     * @author DynTech
     */
    ErrorLogTraceCmp.prototype.getTrace = function (id) {
        var _this = this;
        this.loadingState = true;
        this._dtService.setRestMessageContent('ErrorLogTraceCmp', 'getTrace()');
        this._errorLogService.getLogById(id).subscribe(function (result) {
            _this.trace = _this.formatLogMessage(result.trace);
            _this.loadingState = false;
        }, function (error) {
            _this.loadingState = false;
        });
    };
    /**
     * Format trace message
     * @author DynTech
     */
    ErrorLogTraceCmp.prototype.formatLogMessage = function (message) {
        var tempMessage = message.replace(/(\r\n|\n|\r)/gm, "<br>");
        tempMessage = tempMessage.split('<br>');
        tempMessage.pop();
        for (var i in tempMessage) {
            var tempLineSecondSection = tempMessage[i].split("(");
            if (tempLineSecondSection[1]) {
                tempLineSecondSection[0] = '<div class="trace_row"><span class="method">' + tempLineSecondSection[0] + '</span><span class="code_trace">';
                tempLineSecondSection[1] += '</span></div>';
            }
            else {
                tempLineSecondSection[0] = '<div class="trace_row trace_start"><span class="code_trace">' + tempLineSecondSection[0] + '</span></div>';
            }
            tempMessage[i] = tempLineSecondSection.join('(');
        }
        return tempMessage.join("");
    };
    /*--------- NG On Init ---------*/
    ErrorLogTraceCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Variable initialization
        this.trace = '';
        this.loadingState = false;
        // Methods execution
        this._activatedRoute.params.subscribe(function (params) {
            _this.getTrace(params['id']);
        });
        // Construct methods
        this.__setInitPageTitle('Error trace');
    };
    /*--------- Interface imported --------*/
    ErrorLogTraceCmp.prototype.__setInitPageTitle = function (title) {
        this._dtService.setPageTitle(title);
    };
    ErrorLogTraceCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'errorLogTrace.cmp.html'
        }), 
        __metadata('design:paramtypes', [errorLog_service_1.ErrorLogService, dt_service_1.DTService, router_1.ActivatedRoute])
    ], ErrorLogTraceCmp);
    return ErrorLogTraceCmp;
}());
exports.ErrorLogTraceCmp = ErrorLogTraceCmp;
//# sourceMappingURL=errorLogTrace.cmp.js.map