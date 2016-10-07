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
var dt_service_1 = require('../dtShared/dt.service');
var reportManagement_service_1 = require('./reportManagement.service');
var validation_service_1 = require('../shared/services/validation.service');
var ReportManagementCmp = (function () {
    /*--------- Constructor --------*/
    function ReportManagementCmp(_dtService, _reportManagementService) {
        this._dtService = _dtService;
        this._reportManagementService = _reportManagementService;
    }
    /*--------- App logic --------*/
    /**
     * Loads all the reports.
     * @author DynTech
     */
    ReportManagementCmp.prototype.loadReportsRest = function () {
        var _this = this;
        // this.isLoading = false;
        this.loadingState = true;
        this.reports = null;
        this._dtService.setRestMessageContent('ReportManagementCmp', 'loadingReportRest()');
        this._reportManagementService.getReports().subscribe(function (res) {
            _this.allReports = res;
            _this.reports = _this.allReports;
            _this.loadingState = false;
            _this.sortReportParameters(_this.reports);
        }, function (err) {
            console.log(err);
            _this.loadingState = false;
        });
    };
    /**
     * Creates a report form on click on one of reports.
     * @author DynTech
     */
    ReportManagementCmp.prototype.selectReport = function (id) {
        var _this = this;
        this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: id }))[0];
        this.selectedReportParams = this.parametersArrayToMatrix(this.selectedReport.amReportParameterses);
        this.formLoaded = false;
        var tempFormGroup = {};
        for (var _i = 0, _a = this.selectedReport.amReportParameterses; _i < _a.length; _i++) {
            var parameter = _a[_i];
            var tempValidations = [];
            for (var _b = 0, _c = Object.keys(parameter); _b < _c.length; _b++) {
                var key = _c[_b];
                if (key == 'minValue' && parameter['minValue'] != null) {
                    if (parameter.type == 'String') {
                        tempValidations.push(forms_1.Validators.minLength(parameter['minValue']));
                    }
                    else {
                        tempValidations.push(validation_service_1.ValidationService.validateMin.bind(null, parameter['minValue']));
                    }
                }
                else if (key == 'maxValue' && parameter['minValue'] != null) {
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
            tempFormGroup[parameter.name] = new forms_1.FormControl(parameter.paramValue, tempValidations);
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
     * Scheduling a report.
     * @author DynTech
     */
    ReportManagementCmp.prototype.addBooking = function () {
        var _this = this;
        this.isLoading = true;
        var date = new Date(this.form.value.deadline);
        var params = [];
        var obj = {
            format: this.form.value.format,
            deadline: date.getTime(),
            amReports: null,
            amReportBookingParameterses: null
        };
        var newObj = this._dtService.copy(obj);
        //Setting newSelectedReport so selectedReport doesnt break HTML, it is binded
        var newSelectedReport = this._dtService.copy(this.selectedReport);
        newSelectedReport.parameters = null;
        //Setting report
        obj.amReports = newSelectedReport;
        for (var key in this.form.value) {
            INNERLOOP: for (var _i = 0, _a = this.selectedReport.amReportParameterses; _i < _a.length; _i++) {
                var parameter = _a[_i];
                if (parameter['name'] == key) {
                    var param = {};
                    param['value'] = this.form.value[key];
                    param['amReportParameters'] = parameter;
                    param['amReportBookings'] = newObj;
                    params.push(param);
                    break INNERLOOP;
                }
            }
        }
        //Setting params
        obj.amReportBookingParameterses = params;
        //console.log(obj);
        this._dtService.setRestMessageContent('ReportManagementCmp', 'addBooking()');
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
            INNERLOOP: for (var _i = 0, _a = this.selectedReport.amReportParameterses; _i < _a.length; _i++) {
                var parameter = _a[_i];
                if (parameter['name'] == key) {
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
            amReportParameterses: params,
            frontEndFormat: frontEndFormat
        };
        // var x = new XMLHttpRequest();
        // x.open("GET", 'reports/19/pdf/inline?parameters=%7B"17":"root"%7D', true);
        // x.responseType = 'blob';
        // x.onload = function (e) {
        //     // download(x.response, "maxica.pdf", "application/pdf" ); 
        //     let blob = new Blob([x.response], { type: 'application/pdf' });
        //     console.log(x.response);
        //     var fileURL = URL.createObjectURL(blob);
        //     window.open(fileURL);
        //     // saveAs(blob, "report."+obj.format);
        // }
        // x.send();
        // let pom = 'mario';
        // let blob = new Blob([pom], { type: 'application/pdf' })
        // console.log(blob);
        this._dtService.setRestMessageContent('ReportManagementCmp', 'printReport()');
        this._reportManagementService.printReport(obj).subscribe(function (res) {
            // let blob1 = new Blob([res._body], { type: 'blob' });
            // console.log(res);
            console.log(res);
            // let blob = new Blob([res], { type: 'application/pdf' });
            // console.log(blob1);
            // console.log(blob);
            // saveAs(res, "report.pdf");
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL);
            // download(res._body, "maxica.pdf", "application/pdf" ); 
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
    /*---------- Utilities ----------*/
    /**
     * Addition to filtering by param name
     * @author DynTech
     */
    ReportManagementCmp.prototype.filterArrayOfObjects = function (customArgument, value) {
        return value[customArgument.name] == customArgument.value;
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
    /**
     * Transform parameters array into matrix
     * @author DynTech
     */
    ReportManagementCmp.prototype.parametersArrayToMatrix = function (parametersArrayRef) {
        var tempParameters = this._dtService.copy(parametersArrayRef);
        var tempMatrix = [[]];
        var tempRow = 0;
        for (var _i = 0, tempParameters_1 = tempParameters; _i < tempParameters_1.length; _i++) {
            var parameter = tempParameters_1[_i];
            var tempPosition = parameter.position.split(',');
            if (tempRow != tempPosition[0]) {
                tempMatrix.push([]);
            }
            tempMatrix[parseInt(tempPosition[0])].push(parameter);
            tempRow = tempPosition[0];
        }
        return tempMatrix;
    };
    /**
     * Sort incoming parameters from report by position
     * @author DynTech
     */
    ReportManagementCmp.prototype.sortReportParameters = function (reportsRef) {
        for (var _i = 0, reportsRef_1 = reportsRef; _i < reportsRef_1.length; _i++) {
            var report = reportsRef_1[_i];
            report.amReportParameterses = report.amReportParameterses.sort(function (a, b) {
                return a.position > b.position;
            });
        }
    };
    /*--------- NG On Init ---------*/
    ReportManagementCmp.prototype.ngOnInit = function () {
        this.messages = [];
        this.form = new forms_1.FormGroup({});
        this.formLoaded = false;
        this.loadingState = false;
        this.selectedReportParams = [];
        this.types = [
            { label: 'Asynchronous', value: 'async' },
            { label: 'All', value: 'all' },
            { label: 'Synchronous', value: 'sync' }
        ];
        this.selectedType = 'all';
        this.loadReportsRest();
        // Construct methods
        this.__setInitPageTitle('Report Management');
    };
    /*--------- Interface imported --------*/
    ReportManagementCmp.prototype.__setInitPageTitle = function (title) {
        this._dtService.setPageTitle(title);
    };
    ReportManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'reportManagement.cmp.html',
            // styleUrls: ['app/report_management/reportManagement.cmp.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [dt_service_1.DTService, reportManagement_service_1.ReportManagementService])
    ], ReportManagementCmp);
    return ReportManagementCmp;
}());
exports.ReportManagementCmp = ReportManagementCmp;
//# sourceMappingURL=reportManagement.cmp.js.map