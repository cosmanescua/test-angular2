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
var RouteAccessGuard = (function () {
    function RouteAccessGuard(router, _cookieService) {
        this.router = router;
        this._cookieService = _cookieService;
        //define permissions for each route
        this._routePermissions = {
            '/clientsTest': {
                'allowedUsers': ['daniel'],
                'allowedRole': 'ROLE_ANY'
            },
            '/filesTest': {
                'allowedUsers': ['micko'],
                'allowedRole': 'ROLE_ANY'
            },
            '/cache_test': {
                'allowedUsers': [],
                'allowedRole': 'ROLE_ADMIN'
            },
            '/error_log': {
                'allowedUsers': [],
                'allowedRole': 'ROLE_ADMIN'
            },
            '/admin/create_report': {
                'allowedUsers': [],
                'allowedRole': 'ROLE_ADMIN'
            }
        };
    }
    //only users in _allowedUsers can access the requested route
    RouteAccessGuard.prototype.canActivate = function (route, state) {
        var requestedRoute = state.url;
        console.log("Requested route: " + requestedRoute);
        var requestedRoutePermissions = this._routePermissions[requestedRoute];
        console.log(requestedRoutePermissions);
        if (!requestedRoutePermissions) {
            console.log("No special permissions defined for route: " + requestedRoute);
            return true;
        }
        else {
            var currentUser = this.getCurrentUser();
            if (!currentUser) {
                console.log("No user is logged in");
                //the user has no permission for the route requested - redirect to login page
                console.log("user doesn't have permissions for this route : redirecting to login page");
                this.router.navigate(['/login']);
                return false;
            }
            else {
                var currentUsername = currentUser.username;
                if (requestedRoutePermissions['allowedUsers'].length > 0) {
                    //verify if the current user is allowed to access the route
                    for (var i = 0; i < requestedRoutePermissions['allowedUsers'].length; i++) {
                        if (requestedRoutePermissions['allowedUsers'][i] == currentUsername) {
                            return this.checkRole(requestedRoutePermissions['allowedRole'], currentUser.roles);
                        }
                    }
                    console.log("user doesn't have permissions for this route : redirecting to login page");
                    this.router.navigate(['/login']);
                    return false;
                }
                else {
                    //any user can access the link, but we have to check the allowed roles
                    console.log("No specific username, checking role");
                    console.log(currentUser.roles);
                    return this.checkRole(requestedRoutePermissions['allowedRole'], currentUser.roles);
                }
            }
        }
    };
    RouteAccessGuard.prototype.getCurrentUser = function () {
        if (this._cookieService.get("user"))
            return JSON.parse(this._cookieService.get("user"));
        return null;
    };
    RouteAccessGuard.prototype.checkRole = function (allowedRole, userRoles) {
        if (allowedRole == 'ROLE_ANY') {
            console.log("allowed role is ROLE_ANY");
            return true;
        }
        console.log("allowed role is " + allowedRole + " value: " + userRoles[allowedRole]);
        if (userRoles[allowedRole] == true) {
            return true;
        }
        console.log("user doesn't have permissions for this route : redirecting to login page");
        this.router.navigate(['/login']);
        return false;
    };
    RouteAccessGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService])
    ], RouteAccessGuard);
    return RouteAccessGuard;
}());
exports.RouteAccessGuard = RouteAccessGuard;
//# sourceMappingURL=routesAccessGuard.service.js.map