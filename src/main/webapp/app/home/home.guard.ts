import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { AppService } from '../shared/services/app.service';

@Injectable()
export class HomeAuthGuard {
  constructor(
    private _authService: AuthService
  ) { }

  canLoad(): boolean {
    this._authService.requestedPage = AppService.defaultPage;
    if(!this._authService.initState) {
      return false;
    }
    return true;
  }
}