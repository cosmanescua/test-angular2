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
var authentication_service_1 = require('./test-routes/authentication.service');
var AppCmp = (function () {
    function AppCmp(_authenticationService) {
        this._authenticationService = _authenticationService;
    }
    AppCmp.prototype.promenioTrans = function () {
        console.log('PROMENA');
    };
    AppCmp.prototype.ngOnInit = function () {
        this._authenticationService.initRest().subscribe(function (userData) {
            console.log("app component initialization");
            console.log(userData);
            authentication_service_1.AuthenticationService.setUserPermissions(userData.username, userData.userRoutes);
            authentication_service_1.AuthenticationService.isLoggedIn = true;
        }, function () {
            authentication_service_1.AuthenticationService.isLoggedIn = false;
        });
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.cmp.html',
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=app.cmp.js.map