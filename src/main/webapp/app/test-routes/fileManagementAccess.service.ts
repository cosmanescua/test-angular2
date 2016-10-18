import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {UserLogin} from '../login/userLogin.model';
import {Router,CanActivate } from '@angular/router';
import {Http,Response} from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
@Injectable()
export class FileManagementAccessTestService implements CanActivate{
    private _baseUrl="rest/";
    private _userData;
    private _users=['micko'];
    constructor(private router:Router,  private _cookieService: CookieService){}
    canActivate(){
        this._userData=this.getCurrentUser();
        console.log('Current user' + this._userData);
        if(this.verifyUserPermissions()==false)
        {
            console.log("user doesn't have permissions for this route : redirecting to login page");
            this.router.navigate(['/login']);
        }
        return this.verifyUserPermissions();
    }
    private verifyUserPermissions():boolean
    {
       for(var i=0;i<this._users.length;i++){
           if(this._users[i]==this._userData)
           {
               return true;
           }
        }
        return false;
    }
    private getCurrentUser(){
       if(this._cookieService.get("user"))
            return JSON.parse(this._cookieService.get("user")).username;
        return null;
    }

}