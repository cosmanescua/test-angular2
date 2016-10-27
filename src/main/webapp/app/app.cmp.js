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
var app_service_1 = require('./shared/services/app.service');
var auth_service_1 = require('./shared/services/auth.service');
var AppCmp = (function () {
    /*--------- Constructor --------*/
    function AppCmp(_appService, _router, _authService) {
        this._appService = _appService;
        this._router = _router;
        this._authService = _authService;
    }
    /*--------- App logic --------*/
    /*--------- NG On Init ---------*/
    AppCmp.prototype.ngOnInit = function () {
        // Variables initialization
        var _this = this;
        // Construct methods
        this._appService.setRouter(this._router);
        setTimeout(function () {
            _this._authService.initRest().toPromise().then(function (res) {
                _this._appService.userProfile.userName = res.username;
                _this._appService.setStoredLanguage(res.defaultLanguage);
                _this._authService.userRoutes = _this._appService.convertRoutesToObjects(res);
                auth_service_1.AuthService.bLoginStatus = true;
                _this._authService.initState = true;
                app_service_1.AppService.router.navigate([_this._authService.requestedPage]);
            }, function () {
                _this._authService.initState = true;
                app_service_1.AppService.router.navigate(['login']);
            });
        }, 500);
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.cmp.html',
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router, auth_service_1.AuthService])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=app.cmp.js.map