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
var AdminRoutesAccess = (function () {
    function AdminRoutesAccess(router, _cookieService) {
        this.router = router;
        this._cookieService = _cookieService;
    }
    //only admin users can access the requested route
    AdminRoutesAccess.prototype.canActivate = function () {
        if (this.verifyUserPermissions() == false) {
            //the user has no permission for the route requested - redirect to login page
            console.log("user doesn't have permissions for this route : redirecting to login page");
            this.router.navigate(['/login']);
        }
        return this.verifyUserPermissions();
    };
    //return true if the current users has admin role
    AdminRoutesAccess.prototype.verifyUserPermissions = function () {
        var currentUser = this.getCurrentUser();
        if (currentUser) {
            console.log(currentUser);
            if (currentUser.roles['ROLE_ADMIN'] == true) {
                return true;
            }
        }
        return false;
    };
    AdminRoutesAccess.prototype.getCurrentUser = function () {
        if (this._cookieService.get("user")) {
            return JSON.parse(this._cookieService.get("user"));
        }
        else
            return null;
    };
    AdminRoutesAccess = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService])
    ], AdminRoutesAccess);
    return AdminRoutesAccess;
}());
exports.AdminRoutesAccess = AdminRoutesAccess;
//# sourceMappingURL=adminRoutesAccess.service.js.map