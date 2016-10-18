import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Router,CanActivate } from '@angular/router';
import {Http,Response} from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
@Injectable()
export class ClientsDataAccess implements CanActivate{
    private _userData;
    private _allowedUsers=['daniel'];
    constructor(private router:Router,  private _cookieService: CookieService){}
    //only users in _allowedUsers can access the requested route
    canActivate(){
        this._userData=this.getCurrentUser();
        console.log('Current user' + this._userData);
        if(this.verifyUserPermissions()==false)
        {
            //the user has no permission for the route requested - redirect to login page
            console.log("user doesn't have permissions for this route : redirecting to login page");
            this.router.navigate(['/login']);
        }
        return this.verifyUserPermissions();
    }
    //return true if the current users has the permission to accces the requested route
    private verifyUserPermissions():boolean
    {
       for(var i=0;i<this._allowedUsers.length;i++)
       {
           if(this._allowedUsers[i]==this._userData)
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