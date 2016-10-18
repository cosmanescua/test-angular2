"use strict";
var router_1 = require('@angular/router');
var fileManagementAccess_service_1 = require('./test-routes/fileManagementAccess.service');
var clientsDataAccess_service_1 = require('./test-routes/clientsDataAccess.service');
var adminRoutesAccess_service_1 = require('./test-routes/adminRoutesAccess.service');
var routes = [
    { path: '', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'products', loadChildren: 'app/products/products.module#ProductsModule' },
    { path: 'report_management', loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule' },
    { path: 'cache_test', loadChildren: 'app/cache_test/cacheTest.module#CacheTestModule', canActivate: [adminRoutesAccess_service_1.AdminRoutesAccess] },
    { path: 'error_log', loadChildren: 'app/error_log/errorLog.module#ErrorLogModule', canActivate: [adminRoutesAccess_service_1.AdminRoutesAccess] },
    { path: 'admin/create_report', loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule', canActivate: [adminRoutesAccess_service_1.AdminRoutesAccess] },
    { path: 'usersTest', loadChildren: 'app/users/users.module#UsersModule' },
    { path: 'clientsTest', loadChildren: 'app/clients/clients.module#ClientsModule', canActivate: [clientsDataAccess_service_1.ClientsDataAccess] },
    { path: 'filesTest', loadChildren: 'app/test_file_upload/filesTest.module#FilesTestModule', canActivate: [fileManagementAccess_service_1.FileManagementAccessTestService] },
    { path: '**', redirectTo: 'login' }
];
exports.ROUTING = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map