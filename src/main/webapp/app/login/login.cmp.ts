import { Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

// import {TRANSLATE_PROVIDERS, TranslatePipe, TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

import { Login } from '../login/login.model'
import { LoginService } from '../login/login.service';

import { DTService } from '../dtShared/dt.service';
import { DTViewCmpIf } from '../dtShared/dt.viewcmpIF';


import { DOCUMENT } from '@angular/platform-browser';

declare var $: JQueryStatic;

@Component({
    templateUrl: 'app/login/login.cmp.html',
    // styleUrls: ['app/login/login.cmp.css'],

    encapsulation: ViewEncapsulation.None
})
export class LoginCmp implements OnInit, DTViewCmpIf {
    submitted: boolean;
    loginModel: Login = new Login('micko', 'micko');

    private errorMessage: string;

    constructor(private _loginService: LoginService,
                private _cookieService: CookieService,
                // private _translate: TranslateService,
                private _dtService: DTService,
                @Inject(DOCUMENT) private document) { }

    login(): void {
        // $('#company_css').attr('href', 'mario.css');
        // this.document.getElementById('company_css').setAttribute('href', 'app/stefan.css')

        this._loginService.login(this.loginModel)
            .subscribe(data => {
                this._cookieService.put('X-Auth-Token', data.token);
            }, error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {

        // this._translate.setDefaultLang('en');

        // this._translate.use('en');

        this.__setInitPageTitle('Login');
    }

    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }
}