System.register(['@angular/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1;
    var routes, ROUTING;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            routes = [
                { path: '', loadChildren: 'app/login/login.module#LoginModule' },
                { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
                // { path: 'products', component: ProductsCmp },
                { path: 'report_management', loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule' },
                { path: 'errorLog', loadChildren: 'app/error_log/errorLog.module#ErrorLogModule' },
                { path: 'admin/create_report', loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule' },
                //test path
                { path: 'usersTest', loadChildren: 'app/users/users.module#UsersModule' },
                { path: 'clientsTest', loadChildren: 'app/clients/clients.module#ClientsModule' },
                { path: '**', redirectTo: 'login' }
            ];
            exports_1("ROUTING", ROUTING = router_1.RouterModule.forRoot(routes));
        }
    }
});
//# sourceMappingURL=app.routes.js.map