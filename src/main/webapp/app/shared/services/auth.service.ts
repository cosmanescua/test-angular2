import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'angular2-cookie/core';

import { TOKEN_COOKIE_NAME } from '../../constants';
import { AppService } from './app.service';

import { UserLogin } from '../../login/userLogin.model';

@Injectable()
export class AuthService {
    redirectUrl: string;
    private baseUrl: string;
    static bLoginStatus: boolean;
    requestedPage: string;

    static cookies: CookieService;

    userRoutes: Object;

    initState: boolean;

    constructor(
        private _http: Http,
        private _cookieService: CookieService
    ) {
        this.redirectUrl = '';
        this.requestedPage = '';
        this.baseUrl = 'rest/';
        this.initState = false;

        AuthService.bLoginStatus = false;
        AuthService.cookies = _cookieService;
    }

    /**
     * Get login status
     * @author DynTech
     */
    getLoginStatus(): boolean {
        return AuthService.bLoginStatus;
    }

    /**
     * Check if user is authenticated before app loads
     * @author DynTech
     */
    initRest(): Observable<any> {
        return this._http.get('rest/init').map(res => res.json());
    }

    /**
     * REST - Login authentication with token returned as data
     * @author DynTech 
     */
    login(loginData: UserLogin): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.baseUrl + 'user/authenticate', JSON.stringify(loginData), options);
    }

    /**
     * REST - Logout from app
     * @author DynTech 
     */
    logout(): Observable<any> {
        return this._http.get(this.baseUrl + 'logout');
    }

    /**
     * Clear auth details from app
     * @author DynTech 
     */
    static clearAuth(): void {
        AuthService.cookies.remove(TOKEN_COOKIE_NAME);
        AuthService.bLoginStatus = false;
        AppService.router.navigate(['login']);
    }

    /**
     * REST - Check permission for current route and user
     * @author DynTech 
     */
    checkPermission(route: string): boolean {
        if (this.userRoutes) {
            return this.userRoutes[route];
        }
        return false;
    }
}