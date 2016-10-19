import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { CookieService } from 'angular2-cookie/core';
// import {TRANSLATE_PROVIDERS, TranslatePipe, TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

import { UserLogin } from '../login/userLogin.model'
import { LoginService } from '../login/login.service';

import { DTService } from '../dtShared/dt.service';
import { DTViewCmpIf } from '../dtShared/dt.viewcmpIF';

import { AppService } from '../shared/services/app.service';


import {GlobalEventsManager} from '../test-routes/globalEventManager.service';

declare var $: JQueryStatic;

@Component({
    moduleId: module.id,
    templateUrl: 'login.cmp.html',
    // styleUrls: ['app/login/login.cmp.css'],

    encapsulation: ViewEncapsulation.None
})
export class LoginCmp implements OnInit, DTViewCmpIf {
    submitted: boolean;
    loginModel: UserLogin = new UserLogin('micko', 'micko');

    bLoginState: boolean;
    bLoginSuccessful: boolean;
    bLoadingState: boolean;

    aCssList: any[];
    selectedCompany: string;

    private errorMessage: string;

    /*--------- Constructor --------*/
    constructor(
        private _loginService: LoginService,
        private _cookieService: CookieService,
        private _dtService: DTService,
        private _appService: AppService,
        private _globalEventManager: GlobalEventsManager) { }

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
       
        this._loginService.login(this.loginModel)
            .subscribe(data => {
                this._cookieService.put('X-Auth-Token', data.token);
                this.getUserRest();
                
            });
    }

    /**
     * REST - Get user information based on token retrived previously
     * @author DynTech
     */
    getUserRest(): any {
        this._dtService.setRestMessageContent('LoginCmp', 'getUserRest()');
        this._loginService.getUser().subscribe(result => {
            let tempIterator = 0;
            for (let company in result.companies) {
                let tempOption = {
                    companyName: company,
                    cssFile: result.cssStyles[tempIterator]
                }
                this.aCssList.push(tempOption);
                tempIterator++;
            }

            if (this.aCssList.length == 1) {
                this.selectCompany(this.aCssList[0].cssFile);
            }

            this.bLoginState = true;
            this.bLoginSuccessful = true;
            this.bLoadingState = false;
           

            let userState={};
            userState['username']= result.username;
            userState['roles']=result.roles;
            //set the user data for guard authentication test
            this._cookieService.put('user', JSON.stringify(userState));
            this._globalEventManager.showNavBar.emit(true);

            
        }, error => {
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
        if (selectedCompany.indexOf('/')) {
            selectedCompany = selectedCompany.split('/')[1];
        }

        this._dtService.setCompnayCSS(selectedCompany);

        if (multicompany) {
            this.bLoginState = false;
            this.bLoginSuccessful = false;
        }
        this.bLoadingState = false;

        this.aCssList = [];
        this.selectedCompany = '';
    }


    /*--------- NgOnInit --------*/
    ngOnInit(): void {
        // Variable initialization
        this.bLoginState = false;
        this.bLoginSuccessful = false;
        this.bLoadingState = false;

        this.aCssList = [];
        this.selectedCompany = '';

        // this._translate.setDefaultLang('en');

        // this._translate.use('en');

        // Construct methods
        this.__setInitPageTitle('Login');
    }

    /*--------- Interface imported --------*/
    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }
}