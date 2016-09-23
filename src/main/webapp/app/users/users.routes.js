System.register(['@angular/router', '../users/users.cmp'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, users_cmp_1;
    var ROUTING;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (users_cmp_1_1) {
                users_cmp_1 = users_cmp_1_1;
            }],
        execute: function() {
            exports_1("ROUTING", ROUTING = router_1.RouterModule.forChild([
                {
                    path: '',
                    component: users_cmp_1.UsersCmp
                }
            ]));
        }
    }
});
//# sourceMappingURL=users.routes.js.map