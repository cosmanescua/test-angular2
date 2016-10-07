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
var products_service_1 = require('../products/products.service');
var dt_service_1 = require('../dtShared/dt.service');
var dt_sort_model_1 = require('../dtShared/table/dt.sort.model');
var dt_table_1 = require('../dtShared/table/dt.table');
var ProductsCmp = (function () {
    function ProductsCmp(_productsService, _dtService, _dtTable, _changeDetectionRef) {
        this._productsService = _productsService;
        this._dtService = _dtService;
        this._dtTable = _dtTable;
        this._changeDetectionRef = _changeDetectionRef;
        this.show = true;
    }
    /* === Ajax calls === */
    ProductsCmp.prototype.loadProductsRest = function (currentPage, pageSize) {
        var _this = this;
        this._dtService.setRestMessageContent('ProductsCmp', 'loadProductsRest()');
        this._productsService.getProducts(this._dtTable.getPaginationParams(currentPage, pageSize, this.filters, this.sort))
            .subscribe(function (products) {
            _this.__totalItems = products.totalRows;
            _this.products = products.data;
            _this.__currentPage = currentPage;
            _this.__pageSize = pageSize;
            setTimeout(function () {
                _this.pageSizeChangeStatus = false;
            });
        }, function (error) {
            _this.pageSizeChangeStatus = true;
            _this.__currentPage = 1;
            setTimeout(function () {
                _this.pageSizeChangeStatus = false;
            });
        });
    };
    /* === Pagination methods === */
    ProductsCmp.prototype.__onPageChanged = function (event) {
        if (!this.pageSizeChangeStatus) {
            this.__currentPage = event.page;
            this.loadProductsRest(this.__currentPage, this.__pageSize);
        }
    };
    ;
    ProductsCmp.prototype.__onPageSizeChanged = function () {
        this.pageSizeChangeStatus = true;
        this._changeDetectionRef.detectChanges();
        this.loadProductsRest(1, this.__pageSizeModel);
    };
    ProductsCmp.prototype.filterByName = function () {
        this.pageSizeChangeStatus = true;
        this._changeDetectionRef.detectChanges();
        this.loadProductsRest(1, this.__pageSizeModel);
    };
    // ---------------------- ON INIT
    ProductsCmp.prototype.ngOnInit = function () {
        this.__pageSizeModel = 10;
        this.__pageSize = 10;
        this.__currentPage = 1;
        this.__totalItems = 0;
        this.filters = {
            name: ''
        };
        this.sort = new dt_sort_model_1.Sort('name', 'asc');
        this.pageSizes = [5, 6, 7, 8, 9, 10, 11];
        this.loadProductsRest(this.__currentPage, this.__pageSize);
        // Construct methods
        this.__setInitPageTitle('Products');
    };
    // Interface imported
    ProductsCmp.prototype.__setInitPageTitle = function (title) {
        this._dtService.setPageTitle(title);
    };
    ProductsCmp = __decorate([
        core_1.Component({
            templateUrl: 'app/products/products.cmp.html',
        }), 
        __metadata('design:paramtypes', [products_service_1.ProductsService, dt_service_1.DTService, dt_table_1.DTTable, core_1.ChangeDetectorRef])
    ], ProductsCmp);
    return ProductsCmp;
}());
exports.ProductsCmp = ProductsCmp;
//# sourceMappingURL=products.cmp.js.map