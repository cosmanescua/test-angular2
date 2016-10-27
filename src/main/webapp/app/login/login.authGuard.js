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
var auth_service_1 = require('../shared/services/auth.service');
var app_service_1 = require('../shared/services/app.service');
var LoginAuthGuard = (function () {
    function LoginAuthGuard(_authService) {
        this._authService = _authService;
    }
    LoginAuthGuard.prototype.canActivate = function () {
        if (!this._authService.getLoginStatus() && this._authService.initState) {
            return true;
        }
        app_service_1.AppService.router.navigate([app_service_1.AppService.defaultPage]);
        return false;
    };
    LoginAuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], LoginAuthGuard);
    return LoginAuthGuard;
}());
exports.LoginAuthGuard = LoginAuthGuard;
//# sourceMappingURL=login.authGuard.js.map