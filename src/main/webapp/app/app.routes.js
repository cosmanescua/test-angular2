"use strict";
var router_1 = require('@angular/router');
var routes = [
    { path: '', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'products', loadChildren: 'app/products/products.module#ProductsModule' },
    { path: 'report_management', loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule' },
    { path: 'cache_test', loadChildren: 'app/cache_test/cacheTest.module#CacheTestModule' },
    { path: 'error_log', loadChildren: 'app/error_log/errorLog.module#ErrorLogModule' },
    { path: 'admin/create_report', loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule' },
    { path: 'usersTest', loadChildren: 'app/users/users.module#UsersModule' },
    { path: 'clientsTest', loadChildren: 'app/clients/clients.module#ClientsModule' },
    { path: 'filesTest', loadChildren: 'app/test_file_upload/filesTest.module#FilesTestModule' },
    { path: '**', redirectTo: 'login' }
];
exports.ROUTING = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map