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
var ng2_file_upload_1 = require('ng2-file-upload');
var core_2 = require('angular2-cookie/core');
var filesTest_service_1 = require('./filesTest.service');
var URL = 'rest/testFileUpload';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
var TestFilesCmp = (function () {
    function TestFilesCmp(_cookieService, _testFileService) {
        this._cookieService = _cookieService;
        this._testFileService = _testFileService;
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL, authToken: this._cookieService.get('X-Auth-Token') });
        this._token = this._cookieService.get('X-Auth-Token');
        var This = this;
        this.uploader.onSuccessItem = function () {
            //repopulate files list
            This.getAllFiles();
        };
    }
    TestFilesCmp.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    TestFilesCmp.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    TestFilesCmp.prototype.ngOnInit = function () {
        this.getAllFiles();
    };
    TestFilesCmp.prototype.getAllFiles = function () {
        var _this = this;
        this._testFileService.getAllFiles().subscribe(function (files) { return _this.files = files; }, function (error) { console.log(error); }, function () {
            console.log("getAllFiles complete");
        });
    };
    //not working
    TestFilesCmp.prototype.downloadFile = function (file) {
        this._testFileService.downloadFile(file.id).subscribe(function (data) {
            var a = $("<a style='display: none;'/>");
            var url = window.URL.createObjectURL(data);
            a.attr("href", url);
            a.attr("download", file.filename);
            $("body").append(a);
            a[0].click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }, function (error) { console.log(error); }, function () {
            console.log("download completed");
        });
    };
    TestFilesCmp.prototype.getToken = function () {
        return this._token;
    };
    TestFilesCmp = __decorate([
        core_1.Component({
            templateUrl: 'app/test_file_upload/filesTest.cmp.html'
        }), 
        __metadata('design:paramtypes', [core_2.CookieService, filesTest_service_1.TestFilesService])
    ], TestFilesCmp);
    return TestFilesCmp;
}());
exports.TestFilesCmp = TestFilesCmp;
//# sourceMappingURL=filesTest.cmp.js.map