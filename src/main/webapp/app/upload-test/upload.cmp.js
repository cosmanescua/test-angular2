System.register(['@angular/core', '@angular/http', 'rxjs/Rx', 'angular2-cookie/core'], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1, core_2;
    var UploadComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            UploadComponent = (function () {
                function UploadComponent(http, _cookieService) {
                    this.http = http;
                    this._cookieService = _cookieService;
                }
                UploadComponent.prototype.ngOnInit = function () {
                };
                UploadComponent.prototype.submitTestForm = function () {
                    var _this = this;
                    // let tempToken: string = this._cookieService.get('XSRF-TOKEN');
                    // let headers = new Headers({ 
                    //     'Content-Type': 'application/json',
                    //     'X-XSRF-TOKEN': tempToken
                    // });
                    // let options = new RequestOptions({ headers: headers });
                    console.log("WORKS");
                    console.log($(this.fajl).prop('files'));
                    console.log(new FileReader().readAsBinaryString(this.file));
                    return Rx_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        formData.append("file", _this.file);
                        formData.append("params", _this.param1);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    observer.next(JSON.parse(xhr.response));
                                    observer.complete();
                                }
                                else {
                                    observer.error(xhr.response);
                                }
                            }
                        };
                        xhr.open('POST', "/reports/add", true);
                        xhr.send(formData);
                    }).subscribe(function () {
                        console.log('uspesno');
                    });
                };
                __decorate([
                    core_1.ViewChild('fajl'), 
                    __metadata('design:type', Object)
                ], UploadComponent.prototype, "fajl", void 0);
                UploadComponent = __decorate([
                    core_1.Component({
                        selector: 'app-upload',
                        templateUrl: 'app/upload-test/upload.cmp.html',
                        providers: [core_2.CookieService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
                ], UploadComponent);
                return UploadComponent;
            }());
            exports_1("UploadComponent", UploadComponent);
        }
    }
});
//# sourceMappingURL=upload.cmp.js.map