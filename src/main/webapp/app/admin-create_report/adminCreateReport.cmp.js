System.register(['@angular/core', '../dtShared/dt.service', 'ng2-dragula/ng2-dragula', '../admin-create_report/adminCreateReport.service', '../shared/services/app.service', 'ng2-translate/ng2-translate'], function(exports_1, context_1) {
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
    var core_1, dt_service_1, ng2_dragula_1, adminCreateReport_service_1, app_service_1, ng2_translate_1;
    var AdminCreateReportCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dt_service_1_1) {
                dt_service_1 = dt_service_1_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (adminCreateReport_service_1_1) {
                adminCreateReport_service_1 = adminCreateReport_service_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            }],
        execute: function() {
            AdminCreateReportCmp = (function () {
                /*--------- Constructor --------*/
                function AdminCreateReportCmp(_dtService, _changeDetectionRef, _dragulaService, _adminCreateReportService, translate, _appService) {
                    this._dtService = _dtService;
                    this._changeDetectionRef = _changeDetectionRef;
                    this._dragulaService = _dragulaService;
                    this._adminCreateReportService = _adminCreateReportService;
                    this.translate = translate;
                    this._appService = _appService;
                    var vm = this;
                    // Dragula config 
                    this._dragulaService.setOptions('bag-main', {
                        direction: 'horizontal',
                        accepts: function (el, target, source, sibling) {
                            var tempHasClass = $(el).hasClass('create_report-row-controls');
                            var tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');
                            if (tempHasClass || tempHasClassPlusBetween) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        },
                        moves: function (el, source, handle, sibling) {
                            var tempHasClass = $(el).hasClass('create_report-row-controls');
                            var tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');
                            var tempHasClassPlus = $(el).hasClass('create_report-add_icon-box');
                            return !vm.currentChangingParameter.bEditMode && !tempHasClass && !tempHasClassPlusBetween && !tempHasClassPlus;
                        }
                    });
                    this._dragulaService.drop.subscribe(function (value) {
                        var tempHasBetweenPlus = $(value[3]).find('.create_report-between-add_row')[0];
                        var tempChildCount = value[3].childElementCount;
                        if (tempChildCount == 0) {
                            var tempPrevContainerIndex = $(value[3]).index() - 1;
                            vm.reportProfile.parameters.splice(tempPrevContainerIndex, 1);
                        }
                        vm.bMoveMode = false;
                    });
                    this._dragulaService.drag.subscribe(function (value) {
                        vm.bMoveMode = true;
                        var tempPosition = $(value[1]).attr('position').split('-');
                    });
                    this._dragulaService.over.subscribe(function (value) {
                        vm.bMoveMode = true;
                    });
                    this._dragulaService.out.subscribe(function (value) {
                        vm.bMoveMode = false;
                    });
                    this._dragulaService.dragend.subscribe(function (value) {
                        vm.bMoveMode = false;
                    });
                    // this language will be used as a fallback when a translation isn't found in the current language
                    translate.setDefaultLang('prevod2');
                    // the lang to use, if the lang isn't available, it will use the current loader to get them
                    translate.use('prevod2');
                }
                /*--------- App logic --------*/
                AdminCreateReportCmp.prototype.promenaJezika = function () {
                    console.log('click');
                    this._appService.langChange('en');
                };
                /**
                 * Submit method for creating report
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.createReportSubmit = function (reportProfileRef) {
                    var reader = new FileReader();
                    var vm = this;
                    reader.onload = function () {
                        var arrayBuffer = reader.result;
                        var bytes = new Uint8Array(arrayBuffer);
                        // resolve(bytes);
                        var tempReportProfile = vm._dtService.copy(reportProfileRef);
                        tempReportProfile.parameters = vm.parameterMatrixToArray(reportProfileRef.parameters);
                        // Rest
                        vm._dtService.setRestMessageContent('AdminCreateReport', 'CreateReportSubmit', 'Neka poruka');
                        tempReportProfile.file = vm.fileByteToArray(bytes);
                        // console.log(JSON.stringify(tempReportProfile))
                        vm._adminCreateReportService.createReport(tempReportProfile).subscribe(function (data) {
                        }, function (error) {
                        });
                    };
                    reader.readAsArrayBuffer(this.reportFile.files[0]);
                };
                /**
                 * Method that executes every time when file is changed
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.onChangeFile = function (event) {
                    if (event.target.files[0]) {
                        this.reportFile = event.target;
                    }
                };
                /*--------- Rows --------*/
                /**
                 * Add row at the beggining of the canvas
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.addRowBegining = function (fieldsMatrixRef) {
                    fieldsMatrixRef.unshift([]);
                };
                /**
                 * Add row into form
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.addRow = function (fieldsMatrixRef) {
                    fieldsMatrixRef.push([]);
                };
                /**
                 * Add row in between rows
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.addRowBetween = function (fieldsMatrixRef, row) {
                    fieldsMatrixRef.splice(row + 1, 0, []);
                };
                /**
                 * Remove row from form
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.removeRow = function (fieldsMatrixRef, rowIndex) {
                    fieldsMatrixRef.splice(rowIndex, 1);
                };
                /*--------- Field --------*/
                /**
                 * Add field into form
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.addField = function (fieldsMatrixRef, row) {
                    fieldsMatrixRef[row].push({
                        paramName: '',
                        type: '',
                        paramDescription: '',
                        minValue: null,
                        maxValue: null,
                        mandatory: false,
                        paramValue: ''
                    });
                };
                /**
                 * Add field between two fields
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.addFieldBetween = function (rowRef, index) {
                    rowRef.splice(index, 0, { name: 'field izmedju' });
                };
                /**
                 * Remove field from form
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.removeField = function (fieldsMatrixRef, row, column) {
                    fieldsMatrixRef[row].splice(column, 1);
                };
                /**
                 * Activate edit mode on parameter
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.activateEditMode = function (row, column) {
                    this.currentChangingParameter.y = row;
                    this.currentChangingParameter.x = column;
                    this.currentChangingParameter.bEditMode = true;
                };
                /**
                 * Deactivate edit mode on Done button
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.deactivateEditMode = function () {
                    this.currentChangingParameter.bEditMode = false;
                };
                /*--------- State check methods --------*/
                /**
                 * Check if the last row is populated
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.isBeforeRowPopulated = function (fieldsMatrixRef) {
                    if (fieldsMatrixRef) {
                        var tempLength = fieldsMatrixRef.length;
                        return fieldsMatrixRef[tempLength - 1].length != 0;
                    }
                    else {
                        return false;
                    }
                };
                /**
                 * Check if given field is in edit mode
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.isFieldInEditMode = function (currentChangingParameterRef, row, column) {
                    return currentChangingParameterRef.y == row && currentChangingParameterRef.x == column && currentChangingParameterRef.bEditMode;
                };
                /**
                 * Condition for showing add row between rows icon
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.showAddRowBetween = function (fieldsMatrixRef, row) {
                    var bTempNext = true;
                    var bTempPrev = true;
                    var bIsRowEmpty = fieldsMatrixRef[row].length > 0;
                    var bTempIsNotLast = fieldsMatrixRef.length > row + 1;
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
                };
                /**
                 * Check what type of filed is selected to display text for max and min properties
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.minMaxValueTypeCheck = function (type) {
                    if (type == 'String') {
                        return 'length';
                    }
                    else {
                        return 'value';
                    }
                };
                /**
                 * Check if report profile is valid for submit button
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.isReportProfileValid = function (reportProfileRef, reportFile) {
                    for (var _i = 0, _a = reportProfileRef.parameters; _i < _a.length; _i++) {
                        var row = _a[_i];
                        for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                            var column = row_1[_b];
                            if (column.paramName == '') {
                                return false;
                            }
                        }
                    }
                    if (reportProfileRef.reportName == '' || reportProfileRef.reportDescription == '') {
                        return false;
                    }
                    return reportFile;
                };
                /*--------- Utility --------*/
                /**
                 * Converter from string to boolean
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.toBoolean = function (data) {
                    return JSON.parse(data);
                };
                /**
                 * Matrix for parameters converted into one array for Rest call
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.parameterMatrixToArray = function (matrix) {
                    var tempResult = [];
                    var tempMatrix = this._dtService.copy(matrix);
                    for (var _i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
                        var row = matrix_1[_i];
                        for (var _a = 0, row_2 = row; _a < row_2.length; _a++) {
                            var column = row_2[_a];
                            tempResult.push(column);
                        }
                    }
                    tempMatrix = tempResult;
                    return tempMatrix;
                };
                /**
                 * Files byte object converted to array of bytes
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.fileByteToArray = function (object) {
                    var tempArray = [];
                    for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
                        var objectItem = object_1[_i];
                        tempArray.push(objectItem);
                    }
                    return tempArray;
                };
                /*--------- NG On Init ---------*/
                AdminCreateReportCmp.prototype.ngOnInit = function () {
                    var vm = this; // Class scope
                    // Variables initialization
                    this.bMoveMode = false;
                    this.currentChangingParameter = {
                        y: null,
                        x: null,
                        bEditMode: false
                    };
                    this.reportProfile = {
                        reportName: '',
                        type: 'sync',
                        reportDescription: '',
                        file: [],
                        parameters: [
                            [
                                {
                                    paramName: 'Name',
                                    type: 'String',
                                    paramDescription: 'Your name',
                                    minValue: 0,
                                    maxValue: 50,
                                    mandatory: true,
                                    paramValue: ''
                                }, {
                                    paramName: 'Surname',
                                    type: 'String',
                                    paramDescription: 'Your surname',
                                    minValue: 0,
                                    maxValue: 50,
                                    mandatory: false,
                                    paramValue: ''
                                }
                            ],
                            [
                                {
                                    paramName: 'Place of birty',
                                    type: 'String',
                                    paramDescription: 'Your place of birth',
                                    minValue: 0,
                                    maxValue: 50,
                                    mandatory: false,
                                    paramValue: ''
                                }, {
                                    paramName: 'Year of age',
                                    type: 'Integer',
                                    paramDescription: 'Your years of age',
                                    minValue: 0,
                                    maxValue: 120,
                                    mandatory: true,
                                    paramValue: ''
                                }
                            ]
                        ]
                    };
                    // Construct methods
                    this.__setInitPageTitle("Admin Report Upload");
                };
                AdminCreateReportCmp.prototype.ngOnDestroy = function () {
                    this._dragulaService.destroy('bag-main');
                };
                /*--------- Interface imported --------*/
                /**
                 *
                 * @author DynTech
                 */
                AdminCreateReportCmp.prototype.__setInitPageTitle = function (title) {
                    this._dtService.setPageTitle(title);
                };
                AdminCreateReportCmp = __decorate([
                    core_1.Component({
                        templateUrl: 'app/admin-create_report/adminCreateReport.cmp.html',
                        // styleUrls: ['app/admin-create_report/adminCreateReport.css'],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [dt_service_1.DTService, core_1.ChangeDetectorRef, ng2_dragula_1.DragulaService, adminCreateReport_service_1.AdminCreateReportService, ng2_translate_1.TranslateService, app_service_1.AppService])
                ], AdminCreateReportCmp);
                return AdminCreateReportCmp;
            }());
            exports_1("AdminCreateReportCmp", AdminCreateReportCmp);
        }
    }
});
//# sourceMappingURL=adminCreateReport.cmp.js.map