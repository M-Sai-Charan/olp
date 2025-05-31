import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlpDashboardComponent } from './olp-dashboard/olp-dashboard.component';
import { OlpUsersComponent } from './olp-users/olp-users.component';
import { OlpMenuComponent } from './olp-menu/olp-menu.component';
import { OlpLoginComponent } from './olp-login/olp-login.component';
import { OlpEmployeesComponent } from './olp-employees/olp-employees.component';
import { OlpAdminComponent } from './olp-admin/olp-admin.component';

const routes: Routes = [
  { path: '', component: OlpLoginComponent },
  { path: 'login', component: OlpLoginComponent },
  {
    path: '',
    component: OlpMenuComponent,
    children: [
      { path: 'dashboard', component: OlpDashboardComponent },
      { path: 'users', component: OlpUsersComponent },
      { path: 'employees', component: OlpEmployeesComponent },
      { path: 'admin', component: OlpAdminComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlpRoutingModule { }
