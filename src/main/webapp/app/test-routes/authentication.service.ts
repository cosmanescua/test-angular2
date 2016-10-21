import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
@Injectable()
export class AuthenticationService{
    //define permissions for each route
    static isLoggedIn=false;
    static userPermissions={};
    constructor(private _http:Http){}
    public static setUserPermissions(username, routes)
    {
        AuthenticationService.userPermissions["username"]=username;
        AuthenticationService.userPermissions["routes"]={};
        for(var i=0;i<routes.length;i++)
        {
            AuthenticationService.userPermissions["routes"][routes[i].url]=true;
        }

    }
    public checkPermission(route):boolean
    {
        if(AuthenticationService.userPermissions["routes"])
        {
            let routes=AuthenticationService.userPermissions["routes"];
            if(routes[route]==true)
            {
             return true;
            }
            return false;
        }
        return false;    
    }
    initRest(): Observable<any> {
        return this._http.get('rest/init').map(result => result.json());
    }
    getLoginStatus()
    {
        return AuthenticationService.isLoggedIn;
    }
}