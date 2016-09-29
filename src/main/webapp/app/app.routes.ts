import { Routes, RouterModule } from '@angular/router';

import { ProductsCmp } from './products/products.cmp';
import {UsersCmp} from './users/users.cmp';

const routes: Routes = [
  { path: '', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  // { path: 'products', component: ProductsCmp },
  { path: 'report_management', loadChildren: 'app/report_management/reportManagement.module#ReportManagementModule'},
  { path: 'errorLog', loadChildren: 'app/error_log/errorLog.module#ErrorLogModule'},
  { path: 'admin/create_report', loadChildren: 'app/admin-create_report/adminCreateReport.module#AdminCreateReportModule'},
  //test path
  { path:'usersTest',loadChildren:'app/users/users.module#UsersModule'},
  { path:'clientsTest',loadChildren:'app/clients/clients.module#ClientsModule'},
  { path: '**', redirectTo: 'login' }
   
];

export const ROUTING = RouterModule.forRoot(routes);