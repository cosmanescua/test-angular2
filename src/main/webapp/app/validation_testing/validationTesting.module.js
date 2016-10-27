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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var validationTesting_cmp_1 = require('./validationTesting.cmp');
var utility_module_1 = require('../shared/modules/utility.module');
var dt_httpInterceptor_1 = require('../dtShared/dt.httpInterceptor');
var dt_service_1 = require('../dtShared/dt.service');
var controlMessages_module_1 = require('../shared/modules/controlMessages.module');
var validationTesting_service_1 = require('./validationTesting.service');
var validationTesting_routes_1 = require('./validationTesting.routes');
var ValidationTestingModule = (function () {
    function ValidationTestingModule() {
    }
    ValidationTestingModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.ReactiveFormsModule,
                utility_module_1.UtilityModule,
                controlMessages_module_1.ControlMessageModule,
                validationTesting_routes_1.ROUTING
            ],
            exports: [],
            declarations: [
                validationTesting_cmp_1.ValidationTestingCmp,
            ],
            providers: [
                forms_1.FormBuilder,
                forms_1.Validators,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, dtService) {
                        return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, dtService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, dt_service_1.DTService]
                },
                validationTesting_service_1.ValidationTestingService
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], ValidationTestingModule);
    return ValidationTestingModule;
}());
exports.ValidationTestingModule = ValidationTestingModule;
//# sourceMappingURL=validationTesting.module.js.map