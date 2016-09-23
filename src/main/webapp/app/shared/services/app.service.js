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
    var core_1, core_2;
    var AppService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            AppService = (function () {
                function AppService() {
                    this.titleChanged = new core_1.EventEmitter();
                    this.defaultAppTitle = 'KFuture | ';
                }
                /**
                 * Get default app title prefix
                 * @author DynTech
                 */
                AppService.prototype.getDefaultAppTitle = function () {
                    return this.defaultAppTitle;
                };
                /**
                 * Set default app title prefix
                 * @author DynTech
                 */
                AppService.prototype.setDefaultAppTitle = function (title) {
                    this.defaultAppTitle = title;
                };
                AppService.prototype.langChange = function (lang) {
                    console.log('service exe');
                    this.titleChanged.emit(lang);
                };
                AppService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AppService);
                return AppService;
            }());
            exports_1("AppService", AppService);
        }
    }
});
//# sourceMappingURL=app.service.js.map