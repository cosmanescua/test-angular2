import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AdminCreateReportService } from './adminCreateReport.service';

import { AppService } from '../shared/services/app.service';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { Alert } from '../shared/models';
import { ChangingParameter } from './models';

declare var $: JQueryStatic;

@Component({
    moduleId: module.id,
    templateUrl: 'adminCreateReport.cmp.html',
    // styleUrls: ['app/admin-create_report/adminCreateReport.css'],

    encapsulation: ViewEncapsulation.None
})
export class AdminCreateReportCmp implements OnInit {
    reportProfile: any; // Report's full data
    bMoveMode: boolean; // State of dragging
    currentChangingParameter: ChangingParameter; // Info about current changing parameters 
    reportFile: any; // 
    alertCreateReport: Alert;
    bLoadingState: boolean;

    /*--------- Constructor --------*/
    constructor(private _dtService: DTService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _dragulaService: DragulaService,
        private _adminCreateReportService: AdminCreateReportService,
        private _translateService: TranslateService,
        private _appService: AppService) {
        let vm = this;
        // Dragula config 
        this._dragulaService.setOptions('bag-main', {
            direction: 'horizontal',

            accepts: (el, target, source, sibling) => {
                let tempHasClass = $(el).hasClass('create_report-row-controls');
                let tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');

                if (tempHasClass || tempHasClassPlusBetween) {
                    return false;
                } else {
                    return true;
                }
            },
            moves: (el, source, handle, sibling) => {
                let tempHasClass = $(el).hasClass('create_report-row-controls');
                let tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');
                let tempHasClassPlus = $(el).hasClass('create_report-add_icon-box');


                return !vm.currentChangingParameter.bEditMode && !tempHasClass && !tempHasClassPlusBetween && !tempHasClassPlus;
            }
        });

        this._dragulaService.drop.subscribe((value) => {
            let tempHasBetweenPlus = $(value[3]).find('.create_report-between-add_row')[0];
            let tempChildCount = value[3].childElementCount;

            if (tempChildCount == 0) {
                let tempPrevContainerIndex = $(value[3]).index() - 1;

                vm.reportProfile.amReportParameterses.splice(tempPrevContainerIndex, 1);

            }

            vm.bMoveMode = false;
        });

        this._dragulaService.drag.subscribe((value) => {
            vm.bMoveMode = true;
            let tempPosition = $(value[1]).attr('position').split('-');
        });

        this._dragulaService.over.subscribe((value) => {
            vm.bMoveMode = true;
        });

        this._dragulaService.out.subscribe((value) => {
            vm.bMoveMode = false;
        });

        this._dragulaService.dragend.subscribe((value) => {
            vm.bMoveMode = false;
        });

    }

    /*--------- App logic --------*/
    /**
     * Submit method for creating report
     * @author DynTech
     */
    createReportSubmit(reportProfileRef: any): void {
        var reader = new FileReader();
        this.alertCreateReport.show = false;
        this.bLoadingState = true;

        let vm = this;

        reader.onload = function () {
            var arrayBuffer = reader.result;
            var bytes = new Uint8Array(arrayBuffer);
            // resolve(bytes);
            let tempReportProfile = vm._dtService.copy(reportProfileRef);
            tempReportProfile.amReportParameterses = vm.parameterMatrixToArray(reportProfileRef.amReportParameterses);

            // Rest
            vm._dtService.setRestMessageContent('AdminCreateReport', 'CreateReportSubmit');
            tempReportProfile.amReportBlobs.fileBlob = vm.fileByteToArray(bytes);

            vm._adminCreateReportService.createReport(tempReportProfile).subscribe(data => {
                vm.alertCreateReport.message = 'Report successfully created';
                vm.alertCreateReport.type = 'success';
                vm.alertCreateReport.show = true;
                vm.bLoadingState = false;
            }, error => {
                vm.alertCreateReport.message = 'Report not created';
                vm.alertCreateReport.type = 'danger';
                vm.alertCreateReport.show = true;
                vm.bLoadingState = false;
            })
        }

        reader.readAsArrayBuffer(this.reportFile.files[0]);
    }

    /**
     * Method that executes every time when file is changed
     * @author DynTech
     */
    onChangeFile(event: any): void {
        if (event.target.files[0]) {
            this.reportFile = event.target;
        }
    }

    /*--------- Rows --------*/
    /**
     * Add row at the beggining of the canvas
     * @author DynTech
     */
    addRowBegining(fieldsMatrixRef: any[]): void {
        fieldsMatrixRef.unshift([]);
    }

    /**
     * Add row into form
     * @author DynTech
     */
    addRow(fieldsMatrixRef: any[]): void {
        fieldsMatrixRef.push([]);
    }

    /**
     * Add row in between rows
     * @author DynTech
     */
    addRowBetween(fieldsMatrixRef: any[], row: number): void {
        fieldsMatrixRef.splice(row + 1, 0, []);
    }

    /**
     * Remove row from form
     * @author DynTech
     */
    removeRow(fieldsMatrixRef: any, rowIndex: number): void {
        fieldsMatrixRef.splice(rowIndex, 1);
    }

    /*--------- Field --------*/
    /**
     * Add field into form
     * @author DynTech
     */
    addField(fieldsMatrixRef: any, row: number): void {
        fieldsMatrixRef[row].push({
            name: '',
            type: 'String',
            description: '',
            minValue: null,
            maxValue: null,
            isMandatory: false,
            defaultValue: ''
        })
    }

    /**
     * Add field between two fields
     * @author DynTech
     */
    addFieldBetween(rowRef: any[], index: number) {
        rowRef.splice(index, 0, {
            name: '',
            type: '',
            description: '',
            minValue: null,
            maxValue: null,
            isMandatory: false,
            defaultValue: ''
        })
    }

    /**
     * Remove field from form
     * @author DynTech
     */
    removeField(fieldsMatrixRef: any[], row: number, column: number) {
        fieldsMatrixRef[row].splice(column, 1);
    }

    /**
     * Activate edit mode on parameter
     * @author DynTech
     */
    activateEditMode(row: number, column: number): void {
        this.currentChangingParameter.y = row;
        this.currentChangingParameter.x = column;
        this.currentChangingParameter.bEditMode = true;
    }

    /**
     * Deactivate edit mode on Done button
     * @author DynTech
     */
    deactivateEditMode(): void {
        this.currentChangingParameter.bEditMode = false;
    }

    /*--------- State check methods --------*/
    /**
     * Check if the last row is populated
     * @author DynTech
     */
    isBeforeRowPopulated(fieldsMatrixRef: any[]): boolean {
        if (fieldsMatrixRef) {
            let tempLength = fieldsMatrixRef.length;
            return fieldsMatrixRef[tempLength - 1].length != 0;
        } else {
            return false;
        }
    }

    /**
     * Check if given field is in edit mode
     * @author DynTech
     */
    isFieldInEditMode(currentChangingParameterRef: ChangingParameter, row: number, column: number): boolean {
        return currentChangingParameterRef.y == row && currentChangingParameterRef.x == column && currentChangingParameterRef.bEditMode;
    }

    /**
     * Condition for showing add row between rows icon
     * @author DynTech
     */
    showAddRowBetween(fieldsMatrixRef: any[], row: number): boolean {
        let bTempNext: boolean = true;
        let bTempPrev: boolean = true;

        let bIsRowEmpty: boolean = fieldsMatrixRef[row].length > 0;

        let bTempIsNotLast = fieldsMatrixRef.length > row + 1;

        if (bTempIsNotLast) {
            switch (row) {
                case 0:
                    bTempNext = fieldsMatrixRef[row + 1].length > 0;
                    break;

                case fieldsMatrixRef.length - 1:
                    bTempPrev = fieldsMatrixRef[row - 1].length > 0;
                    break;

                default:
                    bTempNext = fieldsMatrixRef[row + 1].length > 0;
                    bTempPrev = fieldsMatrixRef[row - 1].length > 0;
                    break;
            }

        }
        return bTempNext && bTempNext && bTempIsNotLast && bIsRowEmpty;
    }

    /**
     * Check what type of filed is selected to display text for max and min properties
     * @author DynTech
     */
    minMaxValueTypeCheck(type): string {
        if (type == 'String') {
            return 'length';
        } else {
            return 'value';
        }

    }

    /**
     * Check if report profile is valid for submit button
     * @author DynTech
     */
    isReportProfileValid(reportProfileRef: any, reportFile: any): boolean {
        if(this.bMoveMode || this.currentChangingParameter.bEditMode) {
            return false;
        }

        for (let row of reportProfileRef.amReportParameterses) {
            for (let column of row) {
                if (column.name == '') {
                    return false;
                }
            }
        }

        if (reportProfileRef.name == '' || reportProfileRef.description == '') {
            return false;
        }

        return reportFile;
    }

    /*--------- Utility --------*/

    /**
     * Converter from string to boolean
     * @author DynTech
     */
    toBoolean(data: string): boolean {
        return JSON.parse(data);
    }

    /**
     * Matrix for parameters converted into one array for Rest call
     * @author DynTech
     */
    parameterMatrixToArray(matrix: any): any[] {
        let tempResult = [];
        let tempMatrix = this._dtService.copy(matrix);

        let tempCoordinates = [0, 0]

        for (let row of tempMatrix) {
            for (let column of row) {
                column.position = tempCoordinates[0] + ',' + tempCoordinates[1]
                tempResult.push(column);
                tempCoordinates[1]++;
            }

            tempCoordinates[0]++;
            tempCoordinates[1] = 0;
        }

        tempMatrix = tempResult;

        return tempMatrix;
    }

    /**
     * Files byte object converted to array of bytes
     * @author DynTech
     */
    fileByteToArray(object): any {
        let tempArray = [];

        for (let objectItem of object) {
            tempArray.push(objectItem);
        }

        return tempArray;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Variables initialization
        this.bLoadingState = false;
        this.bMoveMode = false;
        this.alertCreateReport = new Alert(5000, true);

        this.currentChangingParameter = new ChangingParameter();

        this.reportProfile = {
            name: '',
            type: 'sync',
            description: '',
            amReportBlobs: {
                fileBlob: []
            },
            amReportParameterses: [
                [
                    {
                        name: '',
                        type: 'String',
                        description: '',
                        minValue: null,
                        maxValue: null,
                        isMandatory: true,
                        defaultValue: ''
                    }
                ]
            ]
        }

        this._appService.languageChanged.subscribe(lang => {
            this._appService.changeLangTranslate(this._translateService, lang, true);
        });

        AppService.languageChangeCompletedEmit.subscribe(() => {            
        });

        // Construct methods
        this._translateService.use(this._appService.getStoredLanguage()).toPromise().then(() => {
            AppService.languageChangeCompleted();
        });
        
        this._appService.pageLoaded('Create Report');
    }

    ngOnDestroy() { // On destroy
        this._dragulaService.destroy('bag-main');

        this._appService.refreshEmitters();
    }
}