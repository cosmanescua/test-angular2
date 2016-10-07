"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// client component
var clients_service_1 = require('./clients.service');
var core_1 = require('@angular/core');
var client_model_1 = require('./client.model');
var ClientsCmp = (function () {
    function ClientsCmp(_clientsService) {
        this._clientsService = _clientsService;
        this.restResp = "";
        this.displayDialog = false;
        this.genders = ["F", "M"];
        this.countries = ["Romania", "Italy", "France", "Spanish", "Denmark"];
        this._isNewClient = true;
    }
    ;
    //get all clients from the db using ClientsService
    ClientsCmp.prototype.getAllClients = function () {
        var _this = this;
        this.newClient = new client_model_1.Client();
        this._clientsService.getAllClients()
            .subscribe(function (clients) { return _this.clients = clients; });
    };
    ;
    //when the component is initialized populate clients array with the corresponding data from db
    ClientsCmp.prototype.ngOnInit = function () {
        this.getAllClients();
    };
    //when the client form is submittted use ClientsService to update the db
    ClientsCmp.prototype.onSubmit = function () {
        var _this = this;
        //if true the _isNewClient flag tells that the client corresponding to the form is a new client inserted by the user
        if (this._isNewClient) {
            console.log("adding new client");
            //insert new client by pushing the client object return by ClientsService method to the existing clients array
            this._clientsService.addClient(this.newClient)
                .subscribe(function (client) { return _this.clients.push(_this.cloneClient(client)); }, function (error) { console.log(error); }, function () {
                console.log("add client complete");
            });
        }
        else {
            console.log("updating existing client");
            this._clientsService.updateClient(this.newClient)
                .subscribe(function (msg) { return _this.restResp = msg; }, function (error) { console.log(error); }, function () {
                console.log("update client complete");
            });
            // update the client in the clients array
            this.clients[this.findSelectedClientIndex(this._selectedClient)] = this.cloneClient(this.newClient);
            //reset the flag
            this._isNewClient = true;
        }
    };
    //delete a client by removing him from the clients array and and also from the database using Clients method
    ClientsCmp.prototype.delete = function (client) {
        console.log("Delete Client");
        this.clients.splice(this.findSelectedClientIndex(client), 1);
        this._clientsService.removeClient(client.id).subscribe(function (msg) { return msg = msg; });
    };
    // when the user presses the update button the form inputs must be filled with the selected client
    ClientsCmp.prototype.update = function (client) {
        this.newClient = this.cloneClient(client);
        this._isNewClient = false;
        this._selectedClient = client;
    };
    ClientsCmp.prototype.findSelectedClientIndex = function (client) {
        return this.clients.indexOf(client);
    };
    //clone a client object by copying his properties in a new object
    ClientsCmp.prototype.cloneClient = function (client) {
        var clientClone = new client_model_1.Client();
        for (var prop in client) {
            clientClone[prop] = client[prop];
        }
        return clientClone;
    };
    //when the user presses the Details button the modal window containg the details of the selected client must be displayed
    ClientsCmp.prototype.details = function (client) {
        this.displayDialog = true;
        this.selectedClient = client;
    };
    //close the modal window
    ClientsCmp.prototype.closeDialog = function () {
        this.displayDialog = false;
    };
    ClientsCmp = __decorate([
        core_1.Component({
            templateUrl: 'app/clients/clients.cmp.html',
            styleUrls: ['app/clients/clients.cmp.css']
        }), 
        __metadata('design:paramtypes', [clients_service_1.ClientsService])
    ], ClientsCmp);
    return ClientsCmp;
}());
exports.ClientsCmp = ClientsCmp;
//# sourceMappingURL=clients.cmp.js.map