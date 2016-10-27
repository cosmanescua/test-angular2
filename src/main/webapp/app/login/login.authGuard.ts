import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { AppService } from '../shared/services/app.service';

@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor(
        private _authService: AuthService
    ) { }

    canActivate() {
        if (!this._authService.getLoginStatus() && this._authService.initState) {
            return true;
        }
        AppService.router.navigate([AppService.defaultPage])
        return false;
    }
}