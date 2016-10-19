import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {Http,Response} from '@angular/http';
import {CookieService } from 'angular2-cookie/core';
@Injectable()
export class RouteAccessGuard implements CanActivate{
    //define permissions for each route
    private _routePermissions={
        '/clientsTest':
                    {
                        'allowedUsers':['daniel'],
                        'allowedRole':'ROLE_ANY'
                    },
        '/filesTest':
                    {
                        'allowedUsers':['micko'],
                        'allowedRole':'ROLE_ANY'
                    },
        '/cache_test':
                    {
                        'allowedUsers':[],
                        'allowedRole':'ROLE_ADMIN'
                    },
        '/error_log':
                    {
                        'allowedUsers':[],
                        'allowedRole':'ROLE_ADMIN'
                    },
        '/admin/create_report':
                    {
                        'allowedUsers':[],
                        'allowedRole':'ROLE_ADMIN'
                    }
    };
    constructor(private router:Router,  private _cookieService: CookieService){}
    //only users in _allowedUsers can access the requested route
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let requestedRoute=state.url;
        console.log("Requested route: "+requestedRoute);
        let requestedRoutePermissions=this._routePermissions[requestedRoute];
        console.log(requestedRoutePermissions);
        if(!requestedRoutePermissions)
        {
            console.log("No special permissions defined for route: "+requestedRoute);
            return true;
        }
        else
        {
            let currentUser=this.getCurrentUser();
            if(!currentUser)
            {
                console.log("No user is logged in");
                 //the user has no permission for the route requested - redirect to login page
                console.log("user doesn't have permissions for this route : redirecting to login page");
                this.router.navigate(['/login']);
                return false;
            }
            else
            {
                let currentUsername=currentUser.username;
                if(requestedRoutePermissions['allowedUsers'].length>0)
                {
                    //verify if the current user is allowed to access the route
                    for(var i=0;i< requestedRoutePermissions['allowedUsers'].length; i++)
                    {
                        if(requestedRoutePermissions['allowedUsers'][i]==currentUsername)
                        {
                            return this.checkRole(requestedRoutePermissions['allowedRole'],currentUser.roles);
                        }
                    }
                    console.log("user doesn't have permissions for this route : redirecting to login page");
                    this.router.navigate(['/login']);
                    return false;
                }
                else
                {
                    //any user can access the link, but we have to check the allowed roles
                    console.log("No specific username, checking role");
                    console.log(currentUser.roles);
                    return this.checkRole(requestedRoutePermissions['allowedRole'],currentUser.roles);
                }

            }
        }
    }
    private getCurrentUser(){
        if(this._cookieService.get("user"))
            return JSON.parse(this._cookieService.get("user"));
        return null;
    }
    private checkRole(allowedRole, userRoles): boolean
    {
        if(allowedRole=='ROLE_ANY')
        {
              console.log("allowed role is ROLE_ANY");
              return true;
        }  
        
        console.log("allowed role is "+allowedRole+" value: "+ userRoles[allowedRole]);
        if(userRoles[allowedRole]==true)
        {
            return true;
        }
        console.log("user doesn't have permissions for this route : redirecting to login page");
        this.router.navigate(['/login']);
        return false;
    }

}