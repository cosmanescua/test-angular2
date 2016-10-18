import { Routes, RouterModule } from '@angular/router';

import { ProductsCmp } from './products/products.cmp';
import {FileManagementAccessTestService} from './test-routes/fileManagementAccess.service';
import {ClientsDataAccess} from './test-routes/clientsDataAccess.service';
import {AdminRoutesAccess}  from './test-routes/adminRoutesAccess.service';

const routes: Routes = [
  { path: '', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'products', loadChildren: 'app/products/products.module#ProductsModule' },
  { path: 'report_management', loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule'},
  { path: 'cache_test', loadChildren: 'app/cache_test/cacheTest.module#CacheTestModule',canActivate:[AdminRoutesAccess]},
  { path: 'error_log', loadChildren: 'app/error_log/errorLog.module#ErrorLogModule',canActivate:[AdminRoutesAccess]},
  { path: 'admin/create_report', loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule',canActivate:[AdminRoutesAccess]},
  { path:'usersTest',loadChildren:'app/users/users.module#UsersModule'},
  { path:'clientsTest',loadChildren:'app/clients/clients.module#ClientsModule', canActivate:[ClientsDataAccess]},
  { path:'filesTest',loadChildren:'app/test_file_upload/filesTest.module#FilesTestModule', canActivate:[FileManagementAccessTestService]},
  { path: '**', redirectTo: 'login' }
];

export const ROUTING = RouterModule.forRoot(routes);