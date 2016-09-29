import {Component,OnInit} from "@angular/core";
import {User} from "../users/user.model";
import {UsersService} from './users.service';
import { DTViewCmpIf } from '../dtShared/dt.viewCmpIf';
import { DTService } from '../dtShared/dt.service';
import { DragulaService, DragulaModule } from 'ng2-dragula/ng2-dragula';
import {UsersFilterNamePipe} from '../shared/pipes/usersNameFilter.pipe';
import {ClientsService} from '../clients/clients.service';
@Component({
    templateUrl: 'app/users/users.cmp.html',
    styleUrls:['app/users/users.cmp.css']

})
export class UsersCmp implements DTViewCmpIf{
    users: User[];
    usersFilterValue: string="";
    restResp: string="";
    constructor(private _usersSevice: UsersService,
                private _dtService: DTService,
                private _dragulaService:DragulaService){
        };
    
    getUsers(){
        //use usersService to get users that need to be displayed (from a json file)
        this._usersSevice.getUsers()
                    .subscribe(
                        users=>this.users=users
                        )
    };
    ngOnInit(){
        //at the initialization time call getUsers to populate users array
        this.getUsers();
        //set the title of the page
        this.__setInitPageTitle("Test-display users");
    };
     __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    };
     
} 