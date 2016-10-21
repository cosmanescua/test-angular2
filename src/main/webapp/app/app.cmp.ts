import { Component, OnInit} from '@angular/core';
import {AuthenticationService} from './test-routes/authentication.service';
@Component({
    selector: 'app',
    templateUrl: 'app/app.cmp.html',
})

export class AppCmp implements OnInit{

    constructor(private _authenticationService:AuthenticationService){}
    promenioTrans(){
        console.log('PROMENA');
    }
    ngOnInit()
    {
        this._authenticationService.initRest().subscribe(
                function(userData){
                    console.log("app component initialization");
                    console.log(userData);
                    AuthenticationService.setUserPermissions(userData.username,userData.userRoutes);
                    AuthenticationService.isLoggedIn=true;
                },
                function(){
                    AuthenticationService.isLoggedIn=false;
                }
        )
    }

}