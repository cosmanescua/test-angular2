System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var TableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TableComponent = (function () {
                function TableComponent() {
                    this.searchChanged = new core_1.EventEmitter();
                    this.columnSorted = new core_1.EventEmitter();
                    this.pageSizeChanged = new core_1.EventEmitter();
                }
                TableComponent.prototype.ngOnInit = function () {
                    this.columnHeaders = this.config["columnHeaders"];
                    this.pageSize = this.config["pageSize"];
                    this.totalRows = this.config["totalRows"];
                    this.pages = [];
                };
                TableComponent.prototype.setHeader = function (header) {
                    var hdrs = {
                        "glyphicon": header.sortable,
                        "glyphicon-triangle-bottom": (header.sortable && header.direction == "asc"),
                        "glyphicon-triangle-top": (header.sortable && header.direction == "desc")
                    };
                    return hdrs;
                };
                TableComponent.prototype.emitSearchChange = function () {
                    this.searchChanged.emit(this.searchText);
                };
                TableComponent.prototype.emitColumnSort = function (header) {
                    if (header.direction == "asc")
                        header.direction = "desc";
                    else
                        header.direction = "asc";
                    this.columnSorted.emit(header);
                };
                TableComponent.prototype.emitPageSizeChange = function () {
                    this.pageSizeChanged.emit(this.pageSize);
                };
                TableComponent = __decorate([
                    core_1.Component({
                        selector: 'd-table',
                        templateUrl: 'app/shared/table.component.html',
                        styleUrls: ['app/shared/table.component.css'],
                        inputs: ['config', 'data'],
                        outputs: ['searchChanged', 'columnSorted', 'pageSizeChanged'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], TableComponent);
                return TableComponent;
            }());
            exports_1("TableComponent", TableComponent);
        }
    }
});
//# sourceMappingURL=table.component.js.map