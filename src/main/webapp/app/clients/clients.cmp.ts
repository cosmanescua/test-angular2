// client component
import {ClientsService} from './clients.service';
import {Component,OnInit} from '@angular/core';
import {Client} from './client.model';
import {DataTableModule,SharedModule} from 'primeng/primeng';
@Component({
    templateUrl:'app/clients/clients.cmp.html',
    styleUrls:['app/clients/clients.cmp.css']
})
export class ClientsCmp implements OnInit{
    restResp: string="";
    displayDialog: boolean=false;
    clients:any[];
    newClient: Client;
    genders=["F","M"];
    countries=["Romania","Italy","France","Spanish","Denmark"];
    selectedClient:Client;
    private _isNewClient: boolean=true;
    private _selectedClient: Client;

    constructor(private _clientsService:ClientsService){};

    //get all clients from the db using ClientsService
    getAllClients():void{
        this.newClient=new Client();
        this._clientsService.getAllClients()
                    .subscribe(
                        clients=>this.clients=clients
                        );
    };
    //when the component is initialized populate clients array with the corresponding data from db
    ngOnInit(){
        this.getAllClients();
    }
    

    //when the client form is submittted use ClientsService to update the db
    onSubmit(){
       
       //if true the _isNewClient flag tells that the client corresponding to the form is a new client inserted by the user
        if(this._isNewClient)
        {
            console.log("adding new client");
            //insert new client by pushing the client object return by ClientsService method to the existing clients array
            this._clientsService.addClient(this.newClient)
                            .subscribe(
                                client=> this.clients.push(this.cloneClient(client)),
                                function(error){console.log(error)},
                                function(){
                                    console.log("add client complete");
                                    
                                });
           
           
        }
        //otherwise if _isNewClient=false the data corresponding to the form represents an existed client that will be updatd
        else
        {
            console.log("updating existing client");
            this._clientsService.updateClient(this.newClient)
                            .subscribe(
                                msg=>this.restResp=msg,
                                function(error){console.log(error)},
                                function(){
                                    console.log("update client complete");
                                });
            // update the client in the clients array
            this.clients[this.findSelectedClientIndex(this._selectedClient)]=this.cloneClient(this.newClient);
            //reset the flag
            this._isNewClient=true;
        }
        
    }

    //delete a client by removing him from the clients array and and also from the database using Clients method
    delete(client:Client){
        console.log("Delete Client");
        this.clients.splice(this.findSelectedClientIndex(client),1);
        this._clientsService.removeClient(client.id).subscribe(
            msg=>msg=msg
        )
    }
    // when the user presses the update button the form inputs must be filled with the selected client
    update(client:Client){
        this.newClient=this.cloneClient(client);
        this._isNewClient=false;
        this._selectedClient=client;
    }
     findSelectedClientIndex(client:Client): number {
        return this.clients.indexOf(client);
    }
    
    //clone a client object by copying his properties in a new object
    cloneClient(client: Client): Client {
        let clientClone = new Client();
        for(let prop in client) {
            clientClone[prop] = client[prop];
        }
        return clientClone;
    }

    //when the user presses the Details button the modal window containg the details of the selected client must be displayed
    details(client){
        this.displayDialog=true;
        this.selectedClient=client;
    }

    //close the modal window
    closeDialog(){
        this.displayDialog=false;
    }

   
}