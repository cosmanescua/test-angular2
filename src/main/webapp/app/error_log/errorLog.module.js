System.register(['@angular/core', '../error_log/errorLog.service', '../error_log/errorLog.cmp', './errorLog.routes', '../shared/modules/utility.module'], function(exports_1, context_1) {
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
    var core_1, errorLog_service_1, errorLog_cmp_1, errorLog_routes_1, utility_module_1;
    var ErrorLogModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (errorLog_service_1_1) {
                errorLog_service_1 = errorLog_service_1_1;
            },
            function (errorLog_cmp_1_1) {
                errorLog_cmp_1 = errorLog_cmp_1_1;
            },
            function (errorLog_routes_1_1) {
                errorLog_routes_1 = errorLog_routes_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            }],
        execute: function() {
            ErrorLogModule = (function () {
                function ErrorLogModule() {
                }
                ErrorLogModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            errorLog_routes_1.ROUTING,
                            utility_module_1.UtilityModule
                        ],
                        declarations: [
                            errorLog_cmp_1.ErrorLogCmp
                        ],
                        providers: [
                            errorLog_service_1.ErrorLogService
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ErrorLogModule);
                return ErrorLogModule;
            }());
            exports_1("ErrorLogModule", ErrorLogModule);
        }
    }
});
//# sourceMappingURL=errorLog.module.js.map