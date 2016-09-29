System.register(['@angular/core', '../clients/clients.cmp', './clients.routes', '../shared/modules/utility.module', '../clients/clients.service', 'primeng/primeng', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, clients_cmp_1, clients_routes_1, utility_module_1, clients_service_1, primeng_1, primeng_2, forms_1;
    var ClientsModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (clients_cmp_1_1) {
                clients_cmp_1 = clients_cmp_1_1;
            },
            function (clients_routes_1_1) {
                clients_routes_1 = clients_routes_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            },
            function (clients_service_1_1) {
                clients_service_1 = clients_service_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            ClientsModule = (function () {
                function ClientsModule() {
                }
                ClientsModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            clients_routes_1.ROUTING,
                            utility_module_1.UtilityModule,
                            primeng_1.DataTableModule,
                            primeng_1.SharedModule,
                            primeng_2.ButtonModule,
                            forms_1.FormsModule,
                            primeng_1.DialogModule
                        ],
                        declarations: [
                            clients_cmp_1.ClientsCmp
                        ],
                        providers: [
                            clients_service_1.ClientsService
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ClientsModule);
                return ClientsModule;
            }());
            exports_1("ClientsModule", ClientsModule);
        }
    }
});
//# sourceMappingURL=clients.module.js.map