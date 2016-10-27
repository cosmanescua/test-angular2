import { Component, OnInit, ViewEncapsulation, Inject, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { UserLogin } from '../login/userLogin.model'
import { LoginService } from '../login/login.service';

import { DTService } from '../dtShared/dt.service';
import { DTViewCmpIf } from '../dtShared/dt.viewcmpIF';

import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';

import { UserInfo } from '../shared/models';

declare var $: JQueryStatic;

@Component({
    moduleId: module.id,
    templateUrl: 'login.cmp.html',
    // styleUrls: ['app/login/login.cmp.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginCmp implements OnInit {
    submitted: boolean;
    loginModel: UserLogin = new UserLogin('', '');

    token: string;

    bLoginState: boolean;
    bLoginSuccessful: boolean;
    bLoadingState: boolean;

    aCssList: any[];
    selectedCompany: string;

    private errorMessage: string;

    /*--------- Constructor --------*/
    constructor(
        private _loginService: LoginService,
        private _dtService: DTService,
        private _appService: AppService,
        private _authService: AuthService) { }

    /*--------- App logic --------*/
    /**
     * REST - Login authentication with token returned as data
     * @author DynTech
     */
    login(): void {

        this.bLoginState = false;
        this.bLoginSuccessful = false;
        this.bLoadingState = true;

        this._dtService.setRestMessageContent('LoginCmp', 'login()');
        this._authService.login(this.loginModel).toPromise().then(res => {
            this.token = res.json().token;
            this._dtService.setToken(this.token);

            this.getUserRest();
        }, error => {
            AuthService.clearAuth();
            this.bLoginState = true;
            this.bLoginSuccessful = false;
            this.bLoadingState = false;
        });
    }

    /**
     * REST - Get user information based on token retrived previously
     * @author DynTech
     */
    getUserRest(): any {
        this._dtService.setRestMessageContent('LoginCmp', 'getUserRest()');
        this._loginService.getUser().toPromise().then((res: UserInfo) => {
            let tempIterator = 0;

            this.token = this._dtService.getToken();
            this._dtService.removeToken();

            for (let company in res.companies) {
                let tempOption = {
                    companyName: company,
                    cssFile: res.cssStyles[tempIterator]
                }
                this.aCssList.push(tempOption);
                tempIterator++;
            }

            if (this.aCssList.length == 0) {
                this.selectCompany('');
            } else if (this.aCssList.length == 1) {
                this.selectCompany(this.aCssList[0].cssFile);
            }

            this._authService.userRoutes = this._appService.convertRoutesToObjects(res);

            this._appService.userProfile.userName = res.username;
            this._appService.setStoredLanguage(res.defaultLanguage);

            this.bLoginState = true;
            this.bLoginSuccessful = true;
            this.bLoadingState = false;
        }, error => {
            AuthService.clearAuth();
            this.bLoginState = true;
            this.bLoginSuccessful = false;
            this.bLoadingState = false;
        });
    }

    /**
     * Select company panel style
     * @author DynTech
     */
    selectCompany(selectedCompany: string, multicompany?: boolean): void {
        if (selectedCompany) {
            if (selectedCompany.indexOf('/')) {
                selectedCompany = selectedCompany.split('/')[1];
            }

            this._dtService.setCompnayCSS(selectedCompany);
        }

        if (multicompany) {
            this.bLoginState = false;
            this.bLoginSuccessful = false;
        }

        this._dtService.setToken(this.token);

        this.bLoadingState = false;
        this._appService.postLoginLoad = true;
        AuthService.bLoginStatus = true;
        
        let redirectUrlTemp = this._authService.redirectUrl ? this._authService.redirectUrl : AppService.defaultPage;
        AppService.router.navigate([redirectUrlTemp]);

        this.aCssList = [];
        this.selectedCompany = '';
    }

    /*--------- NgOnInit --------*/
    ngOnInit(): void {
        // Variable initialization
        this.bLoginState = false;
        this.bLoginSuccessful = false;
        this.bLoadingState = false;

        this._appService.postLoginLoad = false;

        this.aCssList = [];
        this.selectedCompany = '';

        // Construct methods
        this._appService.pageLoaded('Login', true);
    }
}