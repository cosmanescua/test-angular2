System.register(['@angular/core', '@angular/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var ClientsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            //rest requests will be treated by the TestClientsController
            ClientsService = (function () {
                function ClientsService(_http) {
                    this._http = _http;
                    //base url for the rest controller
                    this._baseUrl = 'rest/';
                }
                //get all clients by performing an http get request to /rest/clients
                ClientsService.prototype.getAllClients = function () {
                    return this._http.get(this._baseUrl + 'clients')
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log(JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                //add new client by performing an http post request to /rest/addClient
                //the body of the request will contain the client to insert, in JSON format
                ClientsService.prototype.addClient = function (client) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    //the controller will return a client object with the id (unique identifier) updated according to the sequence generator
                    return this._http.post(this._baseUrl + "addClient", JSON.stringify(client), options)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log(JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                //update client by performing an http post request to /rest/updateClient
                //the body of the request will contain the client to update, in JSON format
                ClientsService.prototype.updateClient = function (client) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._baseUrl + "updateClient", JSON.stringify(client), options)
                        .map(function (response) { return response; })
                        .catch(this.handleError);
                };
                //remove client by performing an http get request to /rest/removeClient/{id}
                ClientsService.prototype.removeClient = function (id) {
                    console.log("ClientsService-Delete client with id: " + id);
                    return this._http.get(this._baseUrl + "removeClient/" + id)
                        .map(function (response) { return response; })
                        .catch(this.handleError);
                };
                //error handler method
                ClientsService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error || 'Server error');
                };
                ClientsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ClientsService);
                return ClientsService;
            }());
            exports_1("ClientsService", ClientsService);
        }
    }
});
//# sourceMappingURL=clients.service.js.map