import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';
import { ReportManagementService } from './reportManagement.service';
import { ValidationService } from '../shared/services/validation.service';
import { ControlMessages } from '../shared/controlMessage.cmp';
declare let saveAs: any;
declare let download: any;

@Component({
    moduleId: module.id,
    templateUrl: 'reportManagement.cmp.html',
    // styleUrls: ['app/report_management/reportManagement.cmp.css'],

    encapsulation: ViewEncapsulation.None

})
export class ReportManagementCmp implements OnInit, DTViewCmpIf {
    reports: any;
    selectedReport: any;
    formLoaded: boolean;
    deadline: Date;
    messages: Message[];
    form: FormGroup;
    isLoading: boolean;
    types: any[];
    selectedType: string;
    allReports: any[];

    selectedReportParams: any[];

    loadingState: boolean;

    /*--------- Constructor --------*/
    constructor(private _dtService: DTService,
        private _reportManagementService: ReportManagementService) { }


    /*--------- App logic --------*/

    /**
     * Loads all the reports.
     * @author DynTech
     */
    loadReportsRest(): void {
        // this.isLoading = false;
        this.loadingState = true;
        this.reports = null;
        this._dtService.setRestMessageContent('ReportManagementCmp', 'loadingReportRest()');
        this._reportManagementService.getReports().subscribe(
            (res) => {
                this.allReports = res;
                this.reports = this.allReports;
                this.loadingState = false;

                this.sortReportParameters(this.reports);

            },
            (err) => {
                console.log(err);
                this.loadingState = false;
            }
        );
    }

    /**
     * Creates a report form on click on one of reports.
     * @author DynTech
     */
    selectReport(id: number): void {
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
        this.isLoading = true;
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
        //console.log(obj);
        
        this._dtService.setRestMessageContent('ReportManagementCmp', 'addBooking()');
        this._reportManagementService.addBooking(obj).subscribe(
            (res) => {
                this.messages.push({ severity: 'info', summary: 'Success Message', detail: 'Successfully booked a report.' });
            },
            (err) => {
                this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Internal Server Error' });
            },
            () => {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            }
        );
    }

    /**
     * Printing a report.
     * @author DynTech
     */
    public printReport(): void {
        let params = {};
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

        this._reportManagementService.printReport(obj).subscribe(
            (res) => {

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



            }
        );
    }

    /**
     * Selecting sync, async or all reports.
     * @author DynTech
     */
    private onTypeChange(): void {
        this.reports = null;
        this.selectedReport = null;
        setTimeout(() => {
            this.reports = this.allReports.filter(
                el => {
                    if (this.selectedType == "sync")
                        return (el.type == "sync") ? true : false;
                    else if (this.selectedType == "async")
                        return (el.type == "async") ? true : false;
                    else
                        return true;
                }
            );
        });
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


    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        this.messages = [];

        this.form = new FormGroup({});
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
    }

    /*--------- Interface imported --------*/
    __setInitPageTitle(title: string): void {
        this._dtService.setPageTitle(title);
    }
}