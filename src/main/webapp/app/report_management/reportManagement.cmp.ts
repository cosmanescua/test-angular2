import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Message } from 'primeng/primeng';
import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';
import { ReportManagementService } from '../report_management/reportManagement.service';
import { ValidationService } from '../shared/services/validation.service';
import { ControlMessages } from '../shared/controlMessage.cmp';
declare let saveAs: any;

@Component({
    templateUrl: 'app/report_management/reportManagement.cmp.html',
    styleUrls: ['app/report_management/report.cmp.css']
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

    constructor(private _dtService: DTService,
        private _reportManagementService: ReportManagementService) { }

    /**
     * Loads all the reports.
     * @author DynTech
     */
    loadReportsAjax(): void {
        this.isLoading = false;
        this._reportManagementService.getReports().subscribe(
            (res) => {
                this.allReports = res;
                this.reports = this.allReports;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    /**
     * Creates a report form on click on one of reports.
     * @author DynTech
     */
    selectReport(id: number): void { //click method for selecting report from list
        this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: id }))[0];

        this.formLoaded = false;

        let tempFormGroup: any = {};
        for (let parameter of this.selectedReport.parameters) {
            
            let tempValidations = [];

            for (let key of Object.keys(parameter)) {
                if (key == 'minValue') {
                    if (parameter.type == 'String') {
                        tempValidations.push(Validators.minLength(parameter['minValue']));
                    } else {
                        tempValidations.push(ValidationService.validateMin.bind(null, parameter['minValue']));
                    }
                } else if (key == 'maxValue') {
                    if (parameter.type == 'String') {
                        tempValidations.push(Validators.maxLength(parameter['maxValue']));
                    } else {
                        tempValidations.push(ValidationService.validateMax.bind(null, parameter['maxValue']));
                    }
                } else if (key == 'mandatory' && parameter['mandatory']) {
                    tempValidations.push(Validators.required);
                }
            }
            tempFormGroup[parameter.paramName] = new FormControl(parameter.paramValue, tempValidations);
        }
        if(this.selectedReport.type=="async") {
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
    public currentDateWithFormat(date: Date):string {
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
        if( curr_month < 10 )
            new_month = "0"+curr_month;
        if( curr_hours < 10)
            new_hours = "0"+curr_hours;
        if( curr_mins < 10)
            new_mins = "0"+curr_mins;
        if( curr_secs < 10)
            new_secs = "0"+curr_secs;
        return curr_year+"-"+new_month+"-"+curr_date+" "+new_hours+":"+new_mins+":"+new_secs;
    }

    /**
     * Transforms report parameter type into form-readable type.
     * @author DynTech
     */
    private transformFieldType(type: string): string {
        if(type=="Integer" || type=="Double" || type=="Long" || type=="Float") {
            return "number";
        } else if(type=="String") {
            return "text";
        }
    }

    /*---------- Utilities ----------*/
    /**
     * Addition to filtering by param name
     * @author DynTech
     */
    private filterArrayOfObjects(customArgument, value): any {
        return value[customArgument.name] == customArgument.value;
    }

    // On init
    public ngOnInit():void {
        this.messages = [];
        this.__setInitPageTitle('Report Management');

        this.form = new FormGroup({});
        this.formLoaded = false;

        this.types = [
            {label:'Asynchronous', value:'async'},
            {label:'All', value:'all'},
            {label:'Synchronous', value:'sync'}
        ];
        this.selectedType = 'all';

        this.loadReportsAjax();
    }


    // Interface imported
    __setInitPageTitle(title: string):void {
        this._dtService.setPageTitle(title);
    }

    /**
     * Scheduling a report.
     * @author DynTech
     */
    public addBooking():void {
        this.isLoading = true;
        let params = [];
        let obj = {
            id: null,
            format: this.form.value.format,
            deadlineString: this.form.value.deadline,
            report: null,
            user: {
                id: 3,
                username: "root"
            },
            reportParameterValues: null
        }
        let newObj = this._dtService.copy(obj);
        //Setting newSelectedReport so selectedReport doesnt break HTML, it is binded
        let newSelectedReport = this._dtService.copy(this.selectedReport);
        newSelectedReport.parameters = null;
        //Setting report
        obj.report = newSelectedReport;
        for(let key in this.form.value) {
            INNERLOOP: for(let parameter of this.selectedReport.parameters) {
                if(parameter['paramName']==key) {
                    let param = {};
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
        this._reportManagementService.addBooking(obj).subscribe(
            (res) => {
                this.messages.push({severity:'info', summary:'Success Message', detail:'Successfully booked a report.'});
            },
            (err) => {
                this.messages.push({severity:'error', summary:'Error Message', detail: 'Internal Server Error'});
            },
            () => {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            }
        )
    }

    /**
     * Printing a report.
     * @author DynTech
     */
    public printReport():void {
        let params = {};
        for(let key in this.form.value) {
            INNERLOOP: for(let parameter of this.selectedReport.parameters) {
                if(parameter['paramName']==key) {
                    params[parameter['id']] = this.form.value[key];
                    break INNERLOOP;
                }
            }
        }
        let frontEndFormat;
        if(this.form.value.format=="pdf") {
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
            parameters: params,
            frontEndFormat: frontEndFormat
        }
        this._reportManagementService.printReport(obj).subscribe(
            (res) => {
                let blob = new Blob([res._body], { type: obj.frontEndFormat });
                saveAs(blob, "report."+obj.format);
            }
        );
    }

    /**
     * Selecting sync, async or all reports.
     * @author DynTech
     */
    private onTypeChange():void {
        this.reports = null;
        this.selectedReport = null;
        setTimeout(() => {
            this.reports = this.allReports.filter(
                el => {
                    if(this.selectedType=="sync")
                        return (el.type=="sync")?true:false;
                    else if(this.selectedType=="async")
                        return (el.type=="async")?true:false;
                    else
                        return true;
                }
            );
        });
    }
}