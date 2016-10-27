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
var dt_service_1 = require('./dt.service');
var app_service_1 = require('../shared/services/app.service');
var auth_service_1 = require('../shared/services/auth.service');
var constants_1 = require('../constants');
var http_1 = require("@angular/http");
var DTHttpInterceptor = (function (_super) {
    __extends(DTHttpInterceptor, _super);
    function DTHttpInterceptor(backend, defaultOptions, _dtService) {
        _super.call(this, backend, defaultOptions);
        this._dtService = _dtService;
    }
    DTHttpInterceptor.prototype.get = function (url, options) {
        var _this = this;
        var tempUrl = url.indexOf('translations');
        var tempUrlChangeLang = url.indexOf('translations/language');
        var that = this;
        if (tempUrl == -1) {
            return _super.prototype.get.call(this, url, this.getAuthTokenHeader(options)).do(function (res) {
                _this._dtService.restConsoleMessage(url, 'GET', res.status, true, res);
                return Rx_1.Observable;
            }, function (err) {
                _this.handleErrorRequest(err.status, url, 'GET', false, err, true);
                return Rx_1.Observable.throw(err);
            });
        }
        else if (tempUrlChangeLang == -1) {
            app_service_1.AppService.bLanguageLoading = true;
            var transformedUrl = url.split('/');
            transformedUrl = transformedUrl.splice(0, transformedUrl.length - 1);
            transformedUrl = transformedUrl.join('/');
            return _super.prototype.get.call(this, transformedUrl, this.getAuthTokenHeader(options)).do(function () {
                app_service_1.AppService.bLanguageLoading = false;
                return Rx_1.Observable;
            }, function (err) {
                app_service_1.AppService.bLanguageLoading = false;
                _this.handleErrorRequest(err.status, url, 'GET', false, err, false);
                return Rx_1.Observable.throw(err);
            });
        }
        else {
            return _super.prototype.get.call(this, url, this.getAuthTokenHeader(options)).do(function (res) {
                app_service_1.AppService.bLanguageLoading = false;
            }, function (err) {
                app_service_1.AppService.bLanguageLoading = false;
                _this.handleErrorRequest(err.status, url, 'GET', false, err, false);
                return Rx_1.Observable.throw(err);
            });
        }
    };
    DTHttpInterceptor.prototype.post = function (url, body, options) {
        var _this = this;
        var tempUrl = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        var that = this;
        if (tempUrl != 'authenticate') {
            return _super.prototype.post.call(this, url, body, this.getAuthTokenHeader(options, 'application/json')).do(function (res) {
                _this._dtService.restConsoleMessage(url, 'POST', res.status, true, res);
                return Rx_1.Observable;
            }, function (err) {
                _this.handleErrorRequest(err.status, url, 'POST', false, err, true);
                return Rx_1.Observable.throw(err);
            });
        }
        else {
            return _super.prototype.post.call(this, url, body, options).do(function (res) {
                _this._dtService.restConsoleMessage(url, 'POST', res.status, true, res);
                return Rx_1.Observable;
            }, function (err) {
                _this.handleErrorRequest(err.status, url, 'POST', false, err, true);
                return Rx_1.Observable.throw(err);
            });
        }
    };
    DTHttpInterceptor.prototype.put = function (url, body, options) {
        var _this = this;
        var tempUrl = url.split('/');
        tempUrl = tempUrl[tempUrl.length - 1];
        var that = this;
        return _super.prototype.put.call(this, url, body, this.getAuthTokenHeader(options, 'application/json')).do(function (res) {
            _this._dtService.restConsoleMessage(url, 'PUT', res.status, true, res);
            return Rx_1.Observable;
        }, function (err) {
            _this.handleErrorRequest(err.status, url, 'PUT', false, err, true);
            return Rx_1.Observable.throw(err);
        });
    };
    /**
     * Get header with token and additional options from original request
     * @author DynTech
     */
    DTHttpInterceptor.prototype.getAuthTokenHeader = function (options, contentType) {
        var tempheaders = {};
        tempheaders[constants_1.TOKEN_COOKIE_NAME] = this._dtService.getToken();
        var headers = new http_1.Headers(tempheaders);
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
    /**
     * Method for handling request with error
     * @author DynTech
     */
    DTHttpInterceptor.prototype.handleErrorRequest = function (statusCode, url, method, success, err, consoleLog) {
        if (consoleLog) {
            this._dtService.restConsoleMessage(url, method, statusCode, success, err);
        }
        if (statusCode === 401) {
            auth_service_1.AuthService.clearAuth();
            auth_service_1.AuthService.bLoginStatus = false;
            app_service_1.AppService.router.navigate(['login']);
        }
    };
    DTHttpInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, dt_service_1.DTService])
    ], DTHttpInterceptor);
    return DTHttpInterceptor;
}(http_1.Http));
exports.DTHttpInterceptor = DTHttpInterceptor;
//# sourceMappingURL=dt.httpInterceptor.js.map