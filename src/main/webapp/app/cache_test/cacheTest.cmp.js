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
var dt_service_1 = require('../dtShared/dt.service');
var cacheTest_service_1 = require('./cacheTest.service');
var CacheTestCmp = (function () {
    /*--------- Constructor ---------*/
    function CacheTestCmp(_dtService, _cacheTestService) {
        this._dtService = _dtService;
        this._cacheTestService = _cacheTestService;
    }
    /*--------- App logic ---------*/
    /**
     * REST - Testing cache
     * @author DynTech
     */
    CacheTestCmp.prototype.testCacheRest = function (bCached) {
        var _this = this;
        this._dtService.setRestMessageContent('CacheTestCmp', 'testCacheRest()');
        this.loadingState = true;
        this._cacheTestService.testCache().subscribe(function (result) {
            _this.bCacheCleared = false;
            _this.loadingState = false;
            if (bCached) {
                _this.testResultCached.executionDate = new Date();
                _this.testResultCached.dataSize = JSON.stringify(result.ErrorLogs).length;
                _this.testResultCached.executionTime = result.executeTime;
            }
            else {
                _this.testResult.executionDate = new Date();
                _this.testResult.dataSize = JSON.stringify(result.ErrorLogs).length;
                _this.testResult.executionTime = result.executeTime;
            }
        }, function (error) {
            _this.loadingState = false;
        });
    };
    /**
     * REST - Clearing cache
     * @author DynTech
     */
    CacheTestCmp.prototype.clearCacheRest = function () {
        var _this = this;
        this._dtService.setRestMessageContent('CacheTestCmp', 'clearCacheRest()');
        this.loadingState = true;
        this._cacheTestService.clearCache().subscribe(function (result) {
            _this.bCacheCleared = true;
            _this.loadingState = false;
            _this.initialCacheCleared = true;
            _this.resetResult(true);
            _this.resetResult(false);
        }, function (error) {
            _this.loadingState = false;
        });
    };
    /*--------- Utility ---------*/
    /**
     * Reset results of the test depending on parameter value
     * @author DynTech
     */
    CacheTestCmp.prototype.resetResult = function (bCached) {
        if (bCached) {
            this.testResult = {
                executionDate: 0,
                dataSize: 0,
                executionTime: 0
            };
        }
        else {
            this.testResultCached = {
                executionDate: 0,
                dataSize: 0,
                executionTime: 0
            };
        }
    };
    /*--------- NG On Init ---------*/
    CacheTestCmp.prototype.ngOnInit = function () {
        // Variables initialization
        this.testResult = {
            executionDate: 0,
            dataSize: 0,
            executionTime: 0
        };
        this.testResultCached = {
            executionDate: 0,
            dataSize: 0,
            executionTime: 0
        };
        this.loadingState = false;
        this.bCacheCleared = true;
        this.initialCacheCleared = false;
        // Construct methods
        this.__setInitPageTitle('Cache Test');
        this.clearCacheRest();
    };
    /*--------- Interface imported --------*/
    CacheTestCmp.prototype.__setInitPageTitle = function (title) {
        this._dtService.setPageTitle(title);
    };
    CacheTestCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'cacheTest.cmp.html'
        }), 
        __metadata('design:paramtypes', [dt_service_1.DTService, cacheTest_service_1.CacheTestService])
    ], CacheTestCmp);
    return CacheTestCmp;
}());
exports.CacheTestCmp = CacheTestCmp;
//# sourceMappingURL=cacheTest.cmp.js.map