System.register(['@angular/core', '@angular/forms', '../dtShared/dt.service', '../report_management/reportManagement.service', '../shared/services/validation.service'], function(exports_1, context_1) {
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
    var core_1, forms_1, dt_service_1, reportManagement_service_1, validation_service_1;
    var ReportManagementCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (dt_service_1_1) {
                dt_service_1 = dt_service_1_1;
            },
            function (reportManagement_service_1_1) {
                reportManagement_service_1 = reportManagement_service_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            }],
        execute: function() {
            ReportManagementCmp = (function () {
                function ReportManagementCmp(_dtService, _reportManagementService) {
                    this._dtService = _dtService;
                    this._reportManagementService = _reportManagementService;
                }
                /**
                 * Loads all the reports.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.loadReportsAjax = function () {
                    var _this = this;
                    this.isLoading = false;
                    this._reportManagementService.getReports().subscribe(function (res) {
                        _this.allReports = res;
                        _this.reports = _this.allReports;
                    }, function (err) {
                        console.log(err);
                    });
                };
                /**
                 * Creates a report form on click on one of reports.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.selectReport = function (id) {
                    var _this = this;
                    this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: id }))[0];
                    this.formLoaded = false;
                    var tempFormGroup = {};
                    for (var _i = 0, _a = this.selectedReport.parameters; _i < _a.length; _i++) {
                        var parameter = _a[_i];
                        var tempValidations = [];
                        for (var _b = 0, _c = Object.keys(parameter); _b < _c.length; _b++) {
                            var key = _c[_b];
                            if (key == 'minValue') {
                                if (parameter.type == 'String') {
                                    tempValidations.push(forms_1.Validators.minLength(parameter['minValue']));
                                }
                                else {
                                    tempValidations.push(validation_service_1.ValidationService.validateMin.bind(null, parameter['minValue']));
                                }
                            }
                            else if (key == 'maxValue') {
                                if (parameter.type == 'String') {
                                    tempValidations.push(forms_1.Validators.maxLength(parameter['maxValue']));
                                }
                                else {
                                    tempValidations.push(validation_service_1.ValidationService.validateMax.bind(null, parameter['maxValue']));
                                }
                            }
                            else if (key == 'mandatory' && parameter['mandatory']) {
                                tempValidations.push(forms_1.Validators.required);
                            }
                        }
                        tempFormGroup[parameter.paramName] = new forms_1.FormControl(parameter.paramValue, tempValidations);
                    }
                    if (this.selectedReport.type == "async") {
                        tempFormGroup["deadline"] = new forms_1.FormControl(this.currentDateWithFormat(new Date()), [forms_1.Validators.required]);
                    }
                    tempFormGroup["format"] = new forms_1.FormControl('', [forms_1.Validators.required]);
                    this.form = new forms_1.FormGroup(tempFormGroup);
                    setTimeout(function () {
                        _this.formLoaded = true;
                    });
                };
                /**
                 * Formats the date object into YYYY-MM-DD HH:MM:SS format.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.currentDateWithFormat = function (date) {
                    var curr_date = date.getDate();
                    var curr_month = date.getMonth();
                    var curr_year = date.getFullYear();
                    var curr_hours = date.getHours();
                    var curr_mins = date.getMinutes();
                    var curr_secs = date.getSeconds();
                    var new_month = curr_month.toString();
                    var new_secs = curr_secs.toString();
                    var new_mins = curr_mins.toString();
                    var new_hours = curr_hours.toString();
                    if (curr_month < 10)
                        new_month = "0" + curr_month;
                    if (curr_hours < 10)
                        new_hours = "0" + curr_hours;
                    if (curr_mins < 10)
                        new_mins = "0" + curr_mins;
                    if (curr_secs < 10)
                        new_secs = "0" + curr_secs;
                    return curr_year + "-" + new_month + "-" + curr_date + " " + new_hours + ":" + new_mins + ":" + new_secs;
                };
                /**
                 * Transforms report parameter type into form-readable type.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.transformFieldType = function (type) {
                    if (type == "Integer" || type == "Double" || type == "Long" || type == "Float") {
                        return "number";
                    }
                    else if (type == "String") {
                        return "text";
                    }
                };
                /*---------- Utilities ----------*/
                /**
                 * Addition to filtering by param name
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.filterArrayOfObjects = function (customArgument, value) {
                    return value[customArgument.name] == customArgument.value;
                };
                // On init
                ReportManagementCmp.prototype.ngOnInit = function () {
                    this.messages = [];
                    this.__setInitPageTitle('Report Management');
                    this.form = new forms_1.FormGroup({});
                    this.formLoaded = false;
                    this.types = [
                        { label: 'Asynchronous', value: 'async' },
                        { label: 'All', value: 'all' },
                        { label: 'Synchronous', value: 'sync' }
                    ];
                    this.selectedType = 'all';
                    this.loadReportsAjax();
                };
                // Interface imported
                ReportManagementCmp.prototype.__setInitPageTitle = function (title) {
                    this._dtService.setPageTitle(title);
                };
                /**
                 * Scheduling a report.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.addBooking = function () {
                    var _this = this;
                    this.isLoading = true;
                    var params = [];
                    var obj = {
                        id: null,
                        format: this.form.value.format,
                        deadlineString: this.form.value.deadline,
                        report: null,
                        user: {
                            id: 3,
                            username: "root"
                        },
                        reportParameterValues: null
                    };
                    var newObj = this._dtService.copy(obj);
                    //Setting newSelectedReport so selectedReport doesnt break HTML, it is binded
                    var newSelectedReport = this._dtService.copy(this.selectedReport);
                    newSelectedReport.parameters = null;
                    //Setting report
                    obj.report = newSelectedReport;
                    for (var key in this.form.value) {
                        INNERLOOP: for (var _i = 0, _a = this.selectedReport.parameters; _i < _a.length; _i++) {
                            var parameter = _a[_i];
                            if (parameter['paramName'] == key) {
                                var param = {};
                                param['id'] = null;
                                param['paramValue'] = this.form.value[key];
                                param['reportParams'] = parameter;
                                param['reportBooking'] = newObj;
                                params.push(param);
                                break INNERLOOP;
                            }
                        }
                    }
                    //Setting params
                    obj.reportParameterValues = params;
                    this._reportManagementService.addBooking(obj).subscribe(function (res) {
                        _this.messages.push({ severity: 'info', summary: 'Success Message', detail: 'Successfully booked a report.' });
                    }, function (err) {
                        _this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Internal Server Error' });
                    }, function () {
                        setTimeout(function () {
                            _this.isLoading = false;
                        }, 500);
                    });
                };
                /**
                 * Printing a report.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.printReport = function () {
                    var params = {};
                    for (var key in this.form.value) {
                        INNERLOOP: for (var _i = 0, _a = this.selectedReport.parameters; _i < _a.length; _i++) {
                            var parameter = _a[_i];
                            if (parameter['paramName'] == key) {
                                params[parameter['id']] = this.form.value[key];
                                break INNERLOOP;
                            }
                        }
                    }
                    var frontEndFormat;
                    if (this.form.value.format == "pdf") {
                        frontEndFormat = 'application/pdf';
                    }
                    else {
                        frontEndFormat = 'application/vnd.ms-excel';
                    }
                    var obj = {
                        id: null,
                        format: this.form.value.format,
                        deadline: this.form.value.deadline,
                        reportId: this.selectedReport.id,
                        userId: 1,
                        parameters: params,
                        frontEndFormat: frontEndFormat
                    };
                    this._reportManagementService.printReport(obj).subscribe(function (res) {
                        var blob = new Blob([res._body], { type: obj.frontEndFormat });
                        saveAs(blob, "report." + obj.format);
                    });
                };
                /**
                 * Selecting sync, async or all reports.
                 * @author DynTech
                 */
                ReportManagementCmp.prototype.onTypeChange = function () {
                    var _this = this;
                    this.reports = null;
                    this.selectedReport = null;
                    setTimeout(function () {
                        _this.reports = _this.allReports.filter(function (el) {
                            if (_this.selectedType == "sync")
                                return (el.type == "sync") ? true : false;
                            else if (_this.selectedType == "async")
                                return (el.type == "async") ? true : false;
                            else
                                return true;
                        });
                    });
                };
                ReportManagementCmp = __decorate([
                    core_1.Component({
                        templateUrl: 'app/report_management/reportManagement.cmp.html',
                        styleUrls: ['app/report_management/report.cmp.css']
                    }), 
                    __metadata('design:paramtypes', [dt_service_1.DTService, reportManagement_service_1.ReportManagementService])
                ], ReportManagementCmp);
                return ReportManagementCmp;
            }());
            exports_1("ReportManagementCmp", ReportManagementCmp);
        }
    }
});
//# sourceMappingURL=reportManagement.cmp.js.map