System.register(['@angular/core', '../dtShared/dt.service', '../error_log/errorLog.service'], function(exports_1, context_1) {
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
    var core_1, dt_service_1, errorLog_service_1;
    var ErrorLogCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dt_service_1_1) {
                dt_service_1 = dt_service_1_1;
            },
            function (errorLog_service_1_1) {
                errorLog_service_1 = errorLog_service_1_1;
            }],
        execute: function() {
            ErrorLogCmp = (function () {
                /*--------- Constructor --------*/
                function ErrorLogCmp(_dtService, _errorLogService) {
                    this._dtService = _dtService;
                    this._errorLogService = _errorLogService;
                }
                /*--------- App logic --------*/
                /**
                 * Get all logs in list
                 * @author DynTech
                 */
                ErrorLogCmp.prototype.getLog = function () {
                    var _this = this;
                    this._errorLogService.getLog().subscribe(function (logs) { return _this.logs = logs; });
                };
                /**
                 * Get log tracer by id
                 * @author DynTech
                 */
                ErrorLogCmp.prototype.getLogById = function (id) {
                    var _this = this;
                    this._errorLogService.getLogById(id).subscribe(function (error) {
                        _this.error = error;
                        _this.error.trace = _this.formatLogMessage(_this.error.trace);
                    });
                };
                /**
                 * Format log message
                 * @author DynTech
                 */
                ErrorLogCmp.prototype.formatLogMessage = function (message) {
                    var tempMessage = message.replace(/(\r\n|\n|\r)/gm, "<br>");
                    tempMessage = tempMessage.split('<br>');
                    for (var i in tempMessage) {
                        var tempLineSecondSection = tempMessage[i].split("(");
                        if (tempLineSecondSection[1]) {
                            tempLineSecondSection[0] = '- <i>' + tempLineSecondSection[0] + '</i> <b>';
                            tempLineSecondSection[1] += '</b>';
                        }
                        else {
                            tempLineSecondSection[0] = '- <i>' + tempLineSecondSection[0] + '</i>';
                        }
                        tempMessage[i] = tempLineSecondSection.join('(');
                    }
                    // console.log(tempMessage);
                    return tempMessage.join("<br>");
                };
                /*--------- NgOnInit --------*/
                ErrorLogCmp.prototype.ngOnInit = function () {
                    this.__setInitPageTitle('Error log');
                    this.logs = [];
                    this.getLog();
                    // this.getLogById(108);
                };
                //*--------- Interface imported --------*/
                ErrorLogCmp.prototype.__setInitPageTitle = function (title) {
                    this._dtService.setPageTitle(title);
                };
                ErrorLogCmp = __decorate([
                    core_1.Component({
                        templateUrl: 'app/error_log/errorLog.cmp.html',
                        styleUrls: ['app/error_log/errorLog.cmp.css'],
                    }), 
                    __metadata('design:paramtypes', [dt_service_1.DTService, errorLog_service_1.ErrorLogService])
                ], ErrorLogCmp);
                return ErrorLogCmp;
            }());
            exports_1("ErrorLogCmp", ErrorLogCmp);
        }
    }
});
//# sourceMappingURL=errorLog.cmp.js.map