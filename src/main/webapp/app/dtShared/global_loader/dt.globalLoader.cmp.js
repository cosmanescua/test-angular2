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
var DTGlobalLoaderCmp = (function () {
    /*--------- Constructor --------*/
    function DTGlobalLoaderCmp() {
    }
    /*--------- NG On Init ---------*/
    DTGlobalLoaderCmp.prototype.ngOnInit = function () {
        this.loaderCounter = 0;
        this.loadingMessage = '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DTGlobalLoaderCmp.prototype, "loaderCounter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DTGlobalLoaderCmp.prototype, "loadingMessage", void 0);
    DTGlobalLoaderCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dt-global-loader',
            templateUrl: 'dt.globalLoader.cmp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DTGlobalLoaderCmp);
    return DTGlobalLoaderCmp;
}());
exports.DTGlobalLoaderCmp = DTGlobalLoaderCmp;
//# sourceMappingURL=dt.globalLoader.cmp.js.map