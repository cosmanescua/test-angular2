System.register(['@angular/core', './filesTest.routes', '../shared/modules/utility.module', '../test_file_upload/filesTest.cmp', 'ng2-file-upload', 'angular2-cookie/core', '../dtShared/dt.httpInterceptor', '@angular/http', './filesTest.service'], function(exports_1, context_1) {
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
    var core_1, filesTest_routes_1, utility_module_1, filesTest_cmp_1, ng2_file_upload_1, core_2, dt_httpInterceptor_1, http_1, filesTest_service_1;
    var FilesTestModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (filesTest_routes_1_1) {
                filesTest_routes_1 = filesTest_routes_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            },
            function (filesTest_cmp_1_1) {
                filesTest_cmp_1 = filesTest_cmp_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (dt_httpInterceptor_1_1) {
                dt_httpInterceptor_1 = dt_httpInterceptor_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (filesTest_service_1_1) {
                filesTest_service_1 = filesTest_service_1_1;
            }],
        execute: function() {
            FilesTestModule = (function () {
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
            exports_1("FilesTestModule", FilesTestModule);
        }
    }
});
//# sourceMappingURL=filesTest.module.js.map