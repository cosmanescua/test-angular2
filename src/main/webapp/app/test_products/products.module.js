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
var products_component_1 = require('./products.component');
var products_routes_1 = require('./products.routes');
var utility_module_1 = require('../shared/modules/utility.module');
var products_service_1 = require('./products.service');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var TestProductsModule = (function () {
    function TestProductsModule() {
    }
    TestProductsModule = __decorate([
        core_1.NgModule({
            imports: [
                products_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                primeng_1.DataTableModule,
                primeng_1.SharedModule,
                primeng_2.DialogModule
            ],
            declarations: [
                products_component_1.ProductsComponent
            ],
            providers: [
                products_service_1.ProductsService
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], TestProductsModule);
    return TestProductsModule;
}());
exports.TestProductsModule = TestProductsModule;
//# sourceMappingURL=products.module.js.map