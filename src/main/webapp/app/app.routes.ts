import { Routes, RouterModule } from '@angular/router';

import { ProductsCmp } from './products/products.cmp';

import { AuthGuard } from './authGuard';
import { LoginAuthGuard } from './login/login.authGuard';
import { HomeAuthGuard } from './home/home.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    canLoad: [HomeAuthGuard]
  },
  {
    path: 'products',
    loadChildren: 'app/products/products.module#ProductsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'report_management',
    loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/create_report',
    loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'cache_test',
    loadChildren: 'app/cache_test/cacheTest.module#CacheTestModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'error_log',
    loadChildren: 'app/error_log/errorLog.module#ErrorLogModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'dev/exception',
    loadChildren: 'app/validation_testing/validationTesting.module#ValidationTestingModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

export const ROUTING = RouterModule.forRoot(routes);