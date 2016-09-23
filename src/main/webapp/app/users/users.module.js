System.register(['@angular/core', '../users/users.cmp', './users.routes', 'ng2-dragula/ng2-dragula', '../shared/pipes/usersNameFilter.pipe', '../shared/modules/utility.module', '../users/users.service'], function(exports_1, context_1) {
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
    var core_1, users_cmp_1, users_routes_1, ng2_dragula_1, usersNameFilter_pipe_1, utility_module_1, users_service_1;
    var UsersModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (users_cmp_1_1) {
                users_cmp_1 = users_cmp_1_1;
            },
            function (users_routes_1_1) {
                users_routes_1 = users_routes_1_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (usersNameFilter_pipe_1_1) {
                usersNameFilter_pipe_1 = usersNameFilter_pipe_1_1;
            },
            function (utility_module_1_1) {
                utility_module_1 = utility_module_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            UsersModule = (function () {
                function UsersModule() {
                }
                UsersModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            users_routes_1.ROUTING,
                            utility_module_1.UtilityModule,
                            ng2_dragula_1.DragulaModule
                        ],
                        declarations: [
                            users_cmp_1.UsersCmp,
                            usersNameFilter_pipe_1.UsersFilterNamePipe
                        ],
                        providers: [
                            users_service_1.UsersService,
                            ng2_dragula_1.DragulaService
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], UsersModule);
                return UsersModule;
            }());
            exports_1("UsersModule", UsersModule);
        }
    }
});
//# sourceMappingURL=users.module.js.map