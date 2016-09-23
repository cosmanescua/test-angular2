System.register(['rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var UserService;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService() {
                    var _this = this;
                    this.dataChange = new Observable_1.Observable(function (observer) {
                        _this.dataChangeObserver = observer;
                    });
                }
                UserService.prototype.setData = function (data) {
                    this.data = data;
                    this.dataChangeObserver.next(this.data);
                };
                UserService.prototype.getData = function () {
                    return this.data;
                };
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map