import {Injectable} from '@angular/core';
import {Router,CanActivate } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
@Injectable()
export class AdminRoutesAccess implements CanActivate{
    constructor(private router:Router,  private _cookieService: CookieService){}
    //only admin users can access the requested route
    canActivate(){
        if(this.verifyUserPermissions()==false)
        {
            //the user has no permission for the route requested - redirect to login page
            console.log("user doesn't have permissions for this route : redirecting to login page");
            this.router.navigate(['/login']);
        }
        return this.verifyUserPermissions();
    }
    //return true if the current users has admin role
    private verifyUserPermissions():boolean
    {
        let currentUser=this.getCurrentUser();
        if(currentUser)
        {
            console.log(currentUser);
            if(currentUser.roles['ROLE_ADMIN']==true)
            {
                return true;
            }
        }
        return false;
    }
    private getCurrentUser()
    {
        if(this._cookieService.get("user"))
        {
            return JSON.parse(this._cookieService.get("user"));
        }
        else
            return null;
         
    }

}