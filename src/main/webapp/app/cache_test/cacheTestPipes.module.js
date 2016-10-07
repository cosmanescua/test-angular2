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
var pipes_module_1 = require('../shared/modules/pipes.module');
var bytesConverter_pipe_1 = require('../shared/pipes/bytesConverter.pipe');
var CacheTestPipesModule = (function () {
    function CacheTestPipesModule() {
    }
    CacheTestPipesModule = __decorate([
        core_1.NgModule({
            imports: [pipes_module_1.PipesModule],
            exports: [bytesConverter_pipe_1.BytesConverterPipe],
            declarations: [],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], CacheTestPipesModule);
    return CacheTestPipesModule;
}());
exports.CacheTestPipesModule = CacheTestPipesModule;
//# sourceMappingURL=cacheTestPipes.module.js.map