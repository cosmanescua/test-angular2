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
var core_2 = require('angular2-cookie/core');
var constants_1 = require('../../constants');
var app_service_1 = require('./app.service');
var AuthService = (function () {
    function AuthService(_http, _cookieService) {
        this._http = _http;
        this._cookieService = _cookieService;
        this.redirectUrl = '';
        this.requestedPage = '';
        this.baseUrl = 'rest/';
        this.initState = false;
        AuthService.bLoginStatus = false;
        AuthService.cookies = _cookieService;
    }
    /**
     * Get login status
     * @author DynTech
     */
    AuthService.prototype.getLoginStatus = function () {
        return AuthService.bLoginStatus;
    };
    /**
     * Check if user is authenticated before app loads
     * @author DynTech
     */
    AuthService.prototype.initRest = function () {
        return this._http.get('rest/init').map(function (res) { return res.json(); });
    };
    /**
     * REST - Login authentication with token returned as data
     * @author DynTech
     */
    AuthService.prototype.login = function (loginData) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.baseUrl + 'user/authenticate', JSON.stringify(loginData), options);
    };
    /**
     * REST - Logout from app
     * @author DynTech
     */
    AuthService.prototype.logout = function () {
        return this._http.get(this.baseUrl + 'logout');
    };
    /**
     * Clear auth details from app
     * @author DynTech
     */
    AuthService.clearAuth = function () {
        AuthService.cookies.remove(constants_1.TOKEN_COOKIE_NAME);
        AuthService.bLoginStatus = false;
        app_service_1.AppService.router.navigate(['login']);
    };
    /**
     * REST - Check permission for current route and user
     * @author DynTech
     */
    AuthService.prototype.checkPermission = function (route) {
        if (this.userRoutes) {
            return this.userRoutes[route];
        }
        return false;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map