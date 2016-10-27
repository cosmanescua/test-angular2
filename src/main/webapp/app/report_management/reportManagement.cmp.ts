import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Message } from 'primeng/primeng';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';
import { ReportManagementService } from './reportManagement.service';
import { ValidationService } from '../shared/services/validation.service';
import { AppService } from '../shared/services/app.service';

import { ReportFilterPipe } from './pipes/reportFilter.pipe';

import { ReportType, Report } from './models';
import { Alert } from '../shared/models';

declare let saveAs: any;

@Component({
    moduleId: module.id,
    templateUrl: 'reportManagement.cmp.html',
    // styleUrls: ['app/report_management/reportManagement.cmp.css'],
    encapsulation: ViewEncapsulation.None
})
export class ReportManagementCmp implements OnInit {
    reports: Report[];
    allReports: Report[];

    selectedReport: any;
    formLoaded: boolean;
    deadline: Date;
    messages: Message[];
    form: FormGroup;
    types: ReportType[];
    selectedType: string;
    selectedReportParams: any[];
    reportAlert: Alert;

    bLoadingState: boolean;
    bPrintReportLoading: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _dtService: DTService,
        private _reportManagementService: ReportManagementService,
        private _translateService: TranslateService,
        private _appService: AppService) { }


    /*--------- App logic --------*/

    /**
     * Loads all the reports.
     * @author DynTech
     */
    loadReportsRest(): void {
        this.setAlert(false);
        this.bLoadingState = true;
        this.reports = [];
        this.selectedReport = null;
        this._dtService.setRestMessageContent('ReportManagementCmp', 'loadingReportRest()');
        this._reportManagementService.getReports().toPromise().then(
            (res: Report[]) => {
                this.allReports = res;
                this.reports = this.allReports;
                this.bLoadingState = false;

                this.sortReportParameters(this.reports);
            },
            (err) => {
                console.log(err);
                this.bLoadingState = false;
            }
        );
    }

    /**
     * Creates a report form on click on one of reports.
     * @author DynTech
     */
    selectReport(id: number): void {
        this.setAlert(false);
        this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: id }))[0];

        this.selectedReportParams = this.parametersArrayToMatrix(this.selectedReport.amReportParameterses);

        this.formLoaded = false;

        let tempFormGroup: any = {};
        for (let parameter of this.selectedReport.amReportParameterses) {

            let tempValidations = [];

            for (let key of Object.keys(parameter)) {
                if (key == 'minValue' && parameter['minValue'] != null) {
                    if (parameter.type == 'String') {
                        tempValidations.push(Validators.minLength(parameter['minValue']));
                    } else {
                        tempValidations.push(ValidationService.validateMin.bind(null, parameter['minValue']));
                    }
                } else if (key == 'maxValue' && parameter['minValue'] != null) {
                    if (parameter.type == 'String') {
                        tempValidations.push(Validators.maxLength(parameter['maxValue']));
                    } else {
                        tempValidations.push(ValidationService.validateMax.bind(null, parameter['maxValue']));
                    }
                } else if (key == 'mandatory' && parameter['mandatory']) {
                    tempValidations.push(Validators.required);
                }
            }
            tempFormGroup[parameter.name] = new FormControl(parameter.paramValue, tempValidations);
        }
        if (this.selectedReport.type == "async") {
            tempFormGroup["deadline"] = new FormControl(this.currentDateWithFormat(new Date()), [Validators.required]);
        }
        tempFormGroup["format"] = new FormControl('', [Validators.required]);
        this.form = new FormGroup(tempFormGroup);

        setTimeout(() => {
            this.formLoaded = true;
        });
    }

    /**
     * Formats the date object into YYYY-MM-DD HH:MM:SS format.
     * @author DynTech
     */
    public currentDateWithFormat(date: Date): string {
        let curr_date = date.getDate();
        let curr_month = date.getMonth();
        let curr_year = date.getFullYear();
        let curr_hours = date.getHours();
        let curr_mins = date.getMinutes();
        let curr_secs = date.getSeconds();
        let new_month: string = curr_month.toString();
        let new_secs: string = curr_secs.toString();
        let new_mins: string = curr_mins.toString();
        let new_hours: string = curr_hours.toString();
        if (curr_month < 10)
            new_month = "0" + curr_month;
        if (curr_hours < 10)
            new_hours = "0" + curr_hours;
        if (curr_mins < 10)
            new_mins = "0" + curr_mins;
        if (curr_secs < 10)
            new_secs = "0" + curr_secs;
        return curr_year + "-" + new_month + "-" + curr_date + " " + new_hours + ":" + new_mins + ":" + new_secs;
    }

    /**
     * Scheduling a report.
     * @author DynTech
     */
    public addBooking(): void {
        this.setAlert(false);
        
        this.bPrintReportLoading = true;
        let date = new Date(this.form.value.deadline);
        let params = [];
        let obj = {
            format: this.form.value.format,
            deadline: date.getTime(),
            amReports: null,
            amReportBookingParameterses: null
        }
        let newObj = this._dtService.copy(obj);
        //Setting newSelectedReport so selectedReport doesnt break HTML, it is binded
        let newSelectedReport = this._dtService.copy(this.selectedReport);
        newSelectedReport.parameters = null;
        //Setting report
        obj.amReports = newSelectedReport;
        for (let key in this.form.value) {
            INNERLOOP: for (let parameter of this.selectedReport.amReportParameterses) {
                if (parameter['name'] == key) {
                    let param = {};
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

        this._dtService.setRestMessageContent('ReportManagementCmp', 'addBooking()');
        this._reportManagementService.addBooking(obj).toPromise().then(
            (res) => {
                this.setAlert(true, 'Report booked', 'success');
            },
            (err) => {
                this.setAlert(true, 'Report failed booking', 'danger');
            }
        ).then(() => {
            this.bPrintReportLoading = false;
        });
    }

    /**
     * Printing a report.
     * @author DynTech
     */
    public printReport(newWindow: boolean, reportName: string): void {
        let params = {};
        this.bPrintReportLoading = true;

        this.setAlert(false);

        for (let key in this.form.value) {
            INNERLOOP: for (let parameter of this.selectedReport.amReportParameterses) {
                if (parameter['name'] == key) {
                    params[parameter['id']] = this.form.value[key];
                    break INNERLOOP;
                }
            }
        }
        let frontEndFormat;
        if (this.form.value.format == "pdf") {
            frontEndFormat = 'application/pdf';
        } else {
            frontEndFormat = 'application/vnd.ms-excel';
        }
        let obj = {
            id: null,
            format: this.form.value.format,
            deadline: this.form.value.deadline,
            reportId: this.selectedReport.id,
            userId: 1,
            amReportParameterses: params,
            frontEndFormat: frontEndFormat
        }

        this._dtService.setRestMessageContent('ReportManagementCmp', 'printReport()');

        this._reportManagementService.printReport(obj).toPromise().then(
            (res) => {
                let tempBlob = new Blob([res.blob()], { type: 'application/pdf' });

                // this.reportAlert.message = 'Report printed';
                // this.reportAlert.type = 'success';
                // this.reportAlert.show = true;

                this.setAlert(true, 'Report printed', 'success');

                if (newWindow) {
                    var fileURL = URL.createObjectURL(tempBlob);
                    window.open(fileURL);
                } else {
                    saveAs(tempBlob, reportName + ".pdf");
                }

            }, error => {
                this.setAlert(true, 'Report failed printing', 'danger');
            }
        ).then(() => {
            this.bPrintReportLoading = false;
        });
    }

    /**
     * Method to be executed when report type is changed
     * @author DynTech
     */
    typeChanged(): void {
        this.selectedReport = null;
    }

    /*---------- Utilities ----------*/
    /**
     * Addition to filtering by param name
     * @author DynTech
     */
    private filterArrayOfObjects(customArgument, value): any {
        return value[customArgument.name] == customArgument.value;
    }

    /**
     * Transforms report parameter type into form-readable type.
     * @author DynTech
     */
    private transformFieldType(type: string): string {
        if (type == "Integer" || type == "Double" || type == "Long" || type == "Float") {
            return "number";
        } else if (type == "String") {
            return "text";
        }
    }

    /**
     * Transform parameters array into matrix
     * @author DynTech
     */
    private parametersArrayToMatrix(parametersArrayRef: any): any {
        let tempParameters = this._dtService.copy(parametersArrayRef);
        let tempMatrix = [[]];

        let tempRow = 0;
        for (let parameter of tempParameters) {
            let tempPosition = parameter.position.split(',');
            if (tempRow != tempPosition[0]) {
                tempMatrix.push([]);
            }

            tempMatrix[parseInt(tempPosition[0])].push(parameter);
            tempRow = tempPosition[0];
        }


        return tempMatrix;
    }

    /**
     * Sort incoming parameters from report by position
     * @author DynTech
     */
    private sortReportParameters(reportsRef: any) {
        for (let report of reportsRef) {
            report.amReportParameterses = report.amReportParameterses.sort(function (a, b) {
                return a.position > b.position;
            });
        }
    }

    /**
     * Set or remove alert in header with message and type
     * @author DynTech
     */
    private setAlert(show: boolean, message?: string, type?: string): void {
        this.reportAlert.message = message;
        this.reportAlert.type = type;
        this.reportAlert.show = show;
    }


    /**
     * Check if piped report result is empty
     * @author DynTech
     */
    isReportPipeEmpty(reports: Report[], selectedType: string): boolean {
        return new ReportFilterPipe().transform(reports, selectedType).length == 0;
    }

    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Variable initialization
        this.messages = [];
        this.reports = [];

        this.form = new FormGroup({});
        this.formLoaded = false;

        this.bLoadingState = false;
        this.bPrintReportLoading = false;

        this.selectedReportParams = [];

        this.types = [
            new ReportType('Asynchronous', 'async'),
            new ReportType('All', 'all'),
            new ReportType('Synchronous', 'sync')
        ];
        this.selectedType = 'all';

        this.reportAlert = new Alert(null, true);

        // Methods execution
        this._appService.languageChanged.subscribe(lang => {
            this._appService.changeLangTranslate(this._translateService, lang, true);
        });

        AppService.languageChangeCompletedEmit.subscribe(() => {
            this.loadReportsRest();
        });

        // Construct methods
        this._translateService.use(this._appService.getStoredLanguage()).toPromise().then(res => {
            AppService.languageChangeCompleted();
        });

        this._appService.pageLoaded('Report management');
    }

    ngOnDestroy(): void {
        this._appService.refreshEmitters();
    }
}