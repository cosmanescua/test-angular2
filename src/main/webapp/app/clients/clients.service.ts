import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {Client} from './client.model';


//rest requests will be treated by the TestClientsController
@Injectable()
export class ClientsService{
    //base url for the rest controller
    private _baseUrl: string = 'rest/';

    constructor(private _http: Http){}

    //get all clients by performing an http get request to /rest/clients
    getAllClients(): Observable<any> {
        return this._http.get(this._baseUrl + 'clients')
            .map((response: Response) => response.json())
            .do(data=>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    //add new client by performing an http post request to /rest/addClient
    //the body of the request will contain the client to insert, in JSON format
    addClient(client:Client){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //the controller will return a client object with the id (unique identifier) updated according to the sequence generator
        return this._http.post(this._baseUrl+ "addClient",JSON.stringify(client),options)
                .map((response: Response) => response.json())
                .do(data=>console.log(JSON.stringify(data)))
                .catch(this.handleError);
    }

    //update client by performing an http post request to /rest/updateClient
    //the body of the request will contain the client to update, in JSON format
    updateClient(client:Client){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl+ "updateClient",JSON.stringify(client),options)
                .map((response: Response) => response)
                .catch(this.handleError);
    }

    //remove client by performing an http get request to /rest/removeClient/{id}
    removeClient(id: number){
        console.log("ClientsService-Delete client with id: "+id)
        return this._http.get(this._baseUrl+"removeClient/"+id)
                     .map((response: Response) => response)
                     .catch(this.handleError);
    }

    //error handler method
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error|| 'Server error');
    }
}