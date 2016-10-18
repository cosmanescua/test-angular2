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
var router_1 = require('@angular/router');
var core_2 = require('angular2-cookie/core');
var FileManagementAccessTestService = (function () {
    function FileManagementAccessTestService(router, _cookieService) {
        this.router = router;
        this._cookieService = _cookieService;
        this._baseUrl = "rest/";
        this._users = ['micko'];
    }
    FileManagementAccessTestService.prototype.canActivate = function () {
        this._userData = this.getCurrentUser();
        console.log('Current user' + this._userData);
        if (this.verifyUserPermissions() == false) {
            console.log("user doesn't have permissions for this route : redirecting to login page");
            this.router.navigate(['/login']);
        }
        return this.verifyUserPermissions();
    };
    FileManagementAccessTestService.prototype.verifyUserPermissions = function () {
        for (var i = 0; i < this._users.length; i++) {
            if (this._users[i] == this._userData) {
                return true;
            }
        }
        return false;
    };
    FileManagementAccessTestService.prototype.getCurrentUser = function () {
        if (this._cookieService.get("user"))
            return JSON.parse(this._cookieService.get("user")).username;
        return null;
    };
    FileManagementAccessTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService])
    ], FileManagementAccessTestService);
    return FileManagementAccessTestService;
}());
exports.FileManagementAccessTestService = FileManagementAccessTestService;
//# sourceMappingURL=fileManagementAccess.service.js.map