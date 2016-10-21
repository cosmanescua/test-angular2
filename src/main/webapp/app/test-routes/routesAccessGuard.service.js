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
var authentication_service_1 = require('./authentication.service');
var RouteAccessGuard = (function () {
    function RouteAccessGuard(router, _cookieService, _authService) {
        this.router = router;
        this._cookieService = _cookieService;
        this._authService = _authService;
    }
    //only users in _allowedUsers can access the requested route
    RouteAccessGuard.prototype.canActivate = function (route, state) {
        console.log(state);
        console.log(route);
        var path = state.url;
        path = path.substr(1, path.length);
        console.log("Checking permission for route: " + path);
        if (this._authService.checkPermission(path) == false) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    };
    RouteAccessGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, authentication_service_1.AuthenticationService])
    ], RouteAccessGuard);
    return RouteAccessGuard;
}());
exports.RouteAccessGuard = RouteAccessGuard;
//# sourceMappingURL=routesAccessGuard.service.js.map