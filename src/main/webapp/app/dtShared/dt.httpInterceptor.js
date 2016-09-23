System.register(['@angular/core', 'rxjs/Rx', 'angular2-cookie/core', './dt.service', "@angular/http"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, core_2, dt_service_1, http_1;
    var DTHttpInterceptor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (dt_service_1_1) {
                dt_service_1 = dt_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            DTHttpInterceptor = (function (_super) {
                __extends(DTHttpInterceptor, _super);
                function DTHttpInterceptor(backend, defaultOptions, _cookieService) {
                    _super.call(this, backend, defaultOptions);
                    this._cookieService = _cookieService;
                }
                DTHttpInterceptor.prototype.request = function (url, options) {
                    return _super.prototype.request.call(this, url, options);
                };
                DTHttpInterceptor.prototype.get = function (url, options) {
                    var tempThis = this;
                    console.log('GET');
                    return _super.prototype.get.call(this, url, this.getAuthTokenHeader()).do(function (result) {
                        // DTService.restConsoleMessage(url, 'GET', result.status, true);
                        return Rx_1.Observable;
                    }).catch(function (err) {
                        // DTService.restConsoleMessage(url, 'GET', err.status, false);
                        console.log('catch');
                        // if (err.status === 404) {
                        //     console.log('404 greska');
                        //     return Observable.throw(err);
                        // } else {
                        return Rx_1.Observable.throw(err);
                        // }
                    });
                };
                DTHttpInterceptor.prototype.post = function (url, body, options) {
                    var tempThis = this;
                    var tempUrl = url.split('/');
                    tempUrl = tempUrl[tempUrl.length - 1];
                    console.log('POST');
                    console.log(tempUrl);
                    if (tempUrl != 'authenticate') {
                        return _super.prototype.post.call(this, url, body, this.getAuthTokenHeader()).do(function (result) {
                            dt_service_1.DTService.restConsoleMessage(url, 'POST', result.status, true);
                            // tempThis._dtService.restConsoleMessage(url, 'POST', result.status , true);
                            return Rx_1.Observable;
                        }).catch(function (err) {
                            // console.log('catch');
                            // console.log(123);
                            // DTService.restConsoleMessage(url, 'POST', err.status , false);
                            // console.log(1234);
                            // if (err.status === 404) {
                            //     console.log('404 greska');
                            //     return Observable.throw(err);
                            // } else {
                            return Rx_1.Observable.throw(err);
                            // }
                        });
                    }
                    else {
                        return _super.prototype.post.call(this, url, body, options);
                    }
                };
                DTHttpInterceptor.prototype.put = function (url, body, options) {
                    var tempUrl = url.split('/');
                    tempUrl = tempUrl[tempUrl.length - 1];
                    console.log('PUT');
                    return _super.prototype.put.call(this, url, body, this.getAuthTokenHeader()).do(function (result) {
                        return Rx_1.Observable;
                    }).catch(function (err) {
                        console.log('catch');
                        // if (err.status === 404) {
                        //     console.log('404 greska');
                        //     return Observable.throw(err);
                        // } else {
                        return Rx_1.Observable.throw(err);
                        // }
                    });
                };
                DTHttpInterceptor.prototype.getToken = function () {
                    var tempToken = this._cookieService.get('X-Auth-Token');
                    return tempToken;
                };
                DTHttpInterceptor.prototype.getAuthTokenHeader = function () {
                    var headers = new http_1.Headers({
                        'X-Auth-Token': this.getToken(),
                        'Content-Type': 'application/json'
                    });
                    var requestOptions = new http_1.RequestOptions({ headers: headers });
                    return requestOptions;
                };
                DTHttpInterceptor = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, core_2.CookieService])
                ], DTHttpInterceptor);
                return DTHttpInterceptor;
            }(http_1.Http));
            exports_1("DTHttpInterceptor", DTHttpInterceptor);
        }
    }
});
//# sourceMappingURL=dt.httpInterceptor.js.map