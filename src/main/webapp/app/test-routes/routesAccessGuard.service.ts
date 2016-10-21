import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {Http,Response} from '@angular/http';
import {CookieService } from 'angular2-cookie/core';
import {AuthenticationService} from './authentication.service';
@Injectable()
export class RouteAccessGuard implements CanActivate{
    constructor(private router:Router,  private _cookieService: CookieService, private _authService: AuthenticationService){}
    //only users in _allowedUsers can access the requested route
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        console.log(state);
        console.log(route);
        let path=state.url;
        path=path.substr(1,path.length);
        console.log("Checking permission for route: "+ path);
       if(this._authService.checkPermission(path)==false)
       {
           this.router.navigate(['/login']);
           return false;
       }
       return true;
    }
    
}