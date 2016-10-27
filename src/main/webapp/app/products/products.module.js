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
var primeng_1 = require('primeng/primeng');
var pagination_1 = require('ng2-bootstrap/components/pagination');
var products_cmp_1 = require('./products.cmp');
var products_service_1 = require('../products/products.service');
var dt_service_1 = require('../dtShared/dt.service');
var dt_table_1 = require('../dtShared/table/dt.table');
var products_routes_1 = require('./products.routes');
var utility_module_1 = require('../shared/modules/utility.module');
var ProductsModule = (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        core_1.NgModule({
            imports: [
                primeng_1.DataTableModule,
                pagination_1.PaginationModule,
                utility_module_1.UtilityModule,
                products_routes_1.ROUTING
            ],
            declarations: [
                products_cmp_1.ProductsCmp
            ],
            providers: [
                products_service_1.ProductsService,
                dt_service_1.DTService,
                dt_table_1.DTTable
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], ProductsModule);
    return ProductsModule;
}());
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map