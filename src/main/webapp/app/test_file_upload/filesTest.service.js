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
var Observable_1 = require('rxjs/Observable');
var TestFilesService = (function () {
    function TestFilesService(_http) {
        this._http = _http;
        this._baseUrl = "rest/";
    }
    ;
    TestFilesService.prototype.getAllFiles = function () {
        return this._http.get(this._baseUrl + 'getFiles')
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    TestFilesService.prototype.downloadFile = function (id) {
        var _this = this;
        return this._http.get(this._baseUrl + 'downloadFileOk/' + id, { responseType: http_1.ResponseContentType.Blob })
            .map(function (response) { return _this.handleResponse(response); })
            .catch(this.handleError);
    };
    //this throws error "The request body isn't either a blob or an array buffer"
    TestFilesService.prototype.handleResponse = function (response) {
        var contentType = response.headers.get("content-type");
        // console.log(response.arrayBuffer());
        console.log(contentType);
        console.log(response.blob());
        return new Blob([response.blob()], { type: contentType });
    };
    //error handler method
    TestFilesService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || 'Server error');
    };
    TestFilesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TestFilesService);
    return TestFilesService;
}());
exports.TestFilesService = TestFilesService;
//# sourceMappingURL=filesTest.service.js.map