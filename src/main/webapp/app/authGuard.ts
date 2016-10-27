import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

import { AuthService } from './shared/services/auth.service';

@Injectable()
export class AuthGuard {
  constructor(
    private _authService: AuthService
  ) { }

  canLoad(route: Route): boolean {
    this._authService.redirectUrl = route.path;
    this._authService.requestedPage = route.path;
    if(!this._authService.initState) {
      return false;
    }
    return this._authService.checkPermission(route.path);
  }
}