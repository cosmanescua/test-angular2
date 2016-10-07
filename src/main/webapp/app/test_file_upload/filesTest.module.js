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
var filesTest_routes_1 = require('./filesTest.routes');
var utility_module_1 = require('../shared/modules/utility.module');
var filesTest_cmp_1 = require('../test_file_upload/filesTest.cmp');
var ng2_file_upload_1 = require('ng2-file-upload');
var core_2 = require('angular2-cookie/core');
var dt_httpInterceptor_1 = require('../dtShared/dt.httpInterceptor');
var http_1 = require('@angular/http');
var filesTest_service_1 = require('./filesTest.service');
var FilesTestModule = (function () {
    function FilesTestModule() {
    }
    FilesTestModule = __decorate([
        core_1.NgModule({
            imports: [
                filesTest_routes_1.ROUTING,
                utility_module_1.UtilityModule
            ],
            declarations: [
                filesTest_cmp_1.TestFilesCmp,
                ng2_file_upload_1.FileSelectDirective,
                ng2_file_upload_1.FileDropDirective
            ],
            providers: [
                filesTest_service_1.TestFilesService,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, cookieService) {
                        return new dt_httpInterceptor_1.DTHttpInterceptor(backend, defaultOptions, cookieService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, core_2.CookieService]
                },
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], FilesTestModule);
    return FilesTestModule;
}());
exports.FilesTestModule = FilesTestModule;
//# sourceMappingURL=filesTest.module.js.map