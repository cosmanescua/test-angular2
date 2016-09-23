System.register(["@angular/core", './users.service', '../dtShared/dt.service'], function(exports_1, context_1) {
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
    var core_1, users_service_1, dt_service_1;
    var UsersCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (dt_service_1_1) {
                dt_service_1 = dt_service_1_1;
            }],
        execute: function() {
            UsersCmp = (function () {
                function UsersCmp(_usersSevice, _dtService) {
                    this._usersSevice = _usersSevice;
                    this._dtService = _dtService;
                    this.usersFilterValue = "";
                }
                ;
                UsersCmp.prototype.getUsers = function () {
                    var _this = this;
                    //use usersService to get users that need to be displayed (from a json file)
                    this._usersSevice.getUsers()
                        .subscribe(function (users) { return _this.users = users; });
                };
                ;
                UsersCmp.prototype.ngOnInit = function () {
                    //at the initialization time call getUsers to populate users array
                    this.getUsers();
                    //set the title of the page
                    this.__setInitPageTitle("Test- display users");
                };
                ;
                UsersCmp.prototype.__setInitPageTitle = function (title) {
                    this._dtService.setPageTitle(title);
                };
                ;
                UsersCmp = __decorate([
                    core_1.Component({
                        templateUrl: 'app/users/users.cmp.html',
                        styleUrls: ['app/users/users.cmp.css']
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService, dt_service_1.DTService])
                ], UsersCmp);
                return UsersCmp;
            }());
            exports_1("UsersCmp", UsersCmp);
        }
    }
});
//# sourceMappingURL=users.cmp.js.map