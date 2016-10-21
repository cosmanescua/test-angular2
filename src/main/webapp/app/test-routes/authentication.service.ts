import {Injectable} from '@angular/core';
@Injectable()
export class AuthenticationService{
    //define permissions for each route
    private _userPermissions={};
    public setUserPermissions(username, routes)
    {
        this._userPermissions["username"]=username;
        this._userPermissions["routes"]={};
        for(var i=0;i<routes.length;i++)
        {
            this._userPermissions["routes"][routes[i].url]=true;
        }

    }
    public checkPermission(route):boolean
    {
        if(this._userPermissions["routes"])
        {
            let routes=this._userPermissions["routes"];
            if(routes[route]==true)
            {
             return true;
            }
            return false;
        }
        return false;    
    }
}