"use strict";
var router_1 = require('@angular/router');
var routesAccessGuard_service_1 = require('./test-routes/routesAccessGuard.service');
var routes = [
    { path: '', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'products', loadChildren: 'app/products/products.module#ProductsModule' },
    { path: 'report_management', loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule' },
    { path: 'cache_test', loadChildren: 'app/cache_test/cacheTest.module#CacheTestModule', canActivate: [routesAccessGuard_service_1.RouteAccessGuard] },
    { path: 'error_log', loadChildren: 'app/error_log/errorLog.module#ErrorLogModule', canActivate: [routesAccessGuard_service_1.RouteAccessGuard] },
    { path: 'admin/create_report', loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule', canActivate: [routesAccessGuard_service_1.RouteAccessGuard] },
    { path: 'usersTest', loadChildren: 'app/users/users.module#UsersModule' },
    { path: 'clientsTest', loadChildren: 'app/clients/clients.module#ClientsModule', canActivate: [routesAccessGuard_service_1.RouteAccessGuard] },
    { path: 'filesTest', loadChildren: 'app/test_file_upload/filesTest.module#FilesTestModule', canActivate: [routesAccessGuard_service_1.RouteAccessGuard] },
    { path: '**', redirectTo: 'login' }
];
exports.ROUTING = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map