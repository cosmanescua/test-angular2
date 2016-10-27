import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './shared/services/app.service';
import { AuthService } from './shared/services/auth.service';

import { UserInfo } from './shared/models';

@Component({
    selector: 'app',
    templateUrl: 'app/app.cmp.html',
})

export class AppCmp implements OnInit {
    static initState: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _appService: AppService,
        private _router: Router,
        private _authService: AuthService) { }

    /*--------- App logic --------*/


    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Variables initialization

        // Construct methods
        this._appService.setRouter(this._router);

        setTimeout(() => {
            this._authService.initRest().toPromise().then((res: UserInfo) => {
                this._appService.userProfile.userName = res.username;
                this._appService.setStoredLanguage(res.defaultLanguage);
                this._authService.userRoutes = this._appService.convertRoutesToObjects(res);

                AuthService.bLoginStatus = true;
                this._authService.initState = true;

                AppService.router.navigate([this._authService.requestedPage]);
            }, () => {
                this._authService.initState = true;
                AppService.router.navigate(['login']);
            });
        }, 500);
    }
}