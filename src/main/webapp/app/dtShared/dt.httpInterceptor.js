"use strict";
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
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var core_2 = require('angular2-cookie/core');
var dt_service_1 = require('./dt.service');
var http_1 = require("@angular/http");
var DTHttpInterceptor = (function (_super) {
    __extends(DTHttpInterceptor, _super);
    function DTHttpInterceptor(backend, defaultOptions, _cookieService) {
        _super.call(this, backend, defaultOptions);
        this._cookieService = _cookieService;
    }
    DTHttpInterceptor.prototype.request = function (url, options) {
        return _super.prototype.request.call(this, url, options);
    };
    DTHttpInterceptor.prototype.get = function (url, options) {
        var tempUrl = url.indexOf('i18n');
        if (tempUrl == -1) {
            return _super.prototype.get.call(this, url, this.getAuthTokenHeader(options)).do(function (result) {
                dt_service_1.DTService.restConsoleMessage(url, 'GET', result.status, true, result);
                return Rx_1.Observable;
            }).catch(function (err) {
                dt_service_1.DTService.restConsoleMessage(url, 'GET', err.status, false, err);
                console.log('catch');
                // if (err.status === 404) {
                //     console.log('404 greska');
                //     return Observable.throw(err);
                // } else {
                return Rx_1.Observable.throw(err);
                // }
            });
        }
        else {
            return _super.prototype.get.call(this, url);
        }
    };
    DTHttpInterceptor.prototype.post = function (url, body, options) {
        var tempUrl = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        if (tempUrl != 'authenticate') {
            return _super.prototype.post.call(this, url, body, this.getAuthTokenHeader(options, 'application/json')).do(function (result) {
                dt_service_1.DTService.restConsoleMessage(url, 'POST', result.status, true, result);
                return Rx_1.Observable;
            }).catch(function (err) {
                // console.log('catch');
                // console.log(123);
                dt_service_1.DTService.restConsoleMessage(url, 'POST', err.status, false, err);
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
            return _super.prototype.post.call(this, url, body, options).do(function (result) {
                dt_service_1.DTService.restConsoleMessage(url, 'POST', result.status, true, result);
                return Rx_1.Observable;
            }).catch(function (err) {
                dt_service_1.DTService.restConsoleMessage(url, 'POST', err.status, false, err);
                return Rx_1.Observable.throw(err);
            });
        }
    };
    DTHttpInterceptor.prototype.put = function (url, body, options) {
        var tempUrl = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        return _super.prototype.put.call(this, url, body, this.getAuthTokenHeader(options, 'application/json')).do(function (result) {
            dt_service_1.DTService.restConsoleMessage(url, 'PUT', result.status, true, result);
            return Rx_1.Observable;
        }).catch(function (err) {
            dt_service_1.DTService.restConsoleMessage(url, 'POST', err.status, true, err);
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
    DTHttpInterceptor.prototype.getAuthTokenHeader = function (options, contentType) {
        var headers = new http_1.Headers({
            'X-Auth-Token': this.getToken()
        });
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        if (options && options.responseType) {
            return new http_1.RequestOptions({ headers: headers, responseType: options.responseType });
        }
        else {
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    DTHttpInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, core_2.CookieService])
    ], DTHttpInterceptor);
    return DTHttpInterceptor;
}(http_1.Http));
exports.DTHttpInterceptor = DTHttpInterceptor;
//# sourceMappingURL=dt.httpInterceptor.js.map