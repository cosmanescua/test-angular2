import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {User} from './user.model';

@Injectable()
export class UsersService{
    private _usersUrl: string='app/users/users.json';
    constructor(private _http: Http){};
    getUsers(): Observable<User[]>{
        return this._http.get(this._usersUrl)
                    .map((response: Response) => <User[]>response.json())
                    .do(data=>console.log(JSON.stringify(data)))
                    .catch(this.handleError);
    };
 private handleError(error:Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
