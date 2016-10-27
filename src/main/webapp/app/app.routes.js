"use strict";
var router_1 = require('@angular/router');
var authGuard_1 = require('./authGuard');
var login_authGuard_1 = require('./login/login.authGuard');
var home_guard_1 = require('./home/home.guard');
var routes = [
    {
        path: '',
        loadChildren: 'app/login/login.module#LoginModule',
        canActivate: [login_authGuard_1.LoginAuthGuard]
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule',
        canActivate: [login_authGuard_1.LoginAuthGuard]
    },
    {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule',
        canLoad: [home_guard_1.HomeAuthGuard]
    },
    {
        path: 'products',
        loadChildren: 'app/products/products.module#ProductsModule',
        canLoad: [authGuard_1.AuthGuard]
    },
    {
        path: 'report_management',
        loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule',
        canLoad: [authGuard_1.AuthGuard]
    },
    {
        path: 'admin/create_report',
        loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule',
        canLoad: [authGuard_1.AuthGuard]
    },
    {
        path: 'cache_test',
        loadChildren: 'app/cache_test/cacheTest.module#CacheTestModule',
        canLoad: [authGuard_1.AuthGuard]
    },
    {
        path: 'error_log',
        loadChildren: 'app/error_log/errorLog.module#ErrorLogModule',
        canLoad: [authGuard_1.AuthGuard]
    },
    {
        path: 'dev/exception',
        loadChildren: 'app/validation_testing/validationTesting.module#ValidationTestingModule',
        canLoad: [authGuard_1.AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
exports.ROUTING = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map