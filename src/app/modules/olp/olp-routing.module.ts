import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlpDashboardComponent } from './olp-dashboard/olp-dashboard.component';
import { OlpUsersComponent } from './olp-users/olp-users.component';
import { OlpMenuComponent } from './olp-menu/olp-menu.component';
import { OlpLoginComponent } from './olp-login/olp-login.component';
import { OlpEmployeesComponent } from './olp-employees/olp-employees.component';
import { OlpAdminComponent } from './olp-admin/olp-admin.component';
import { OlpBudgetComponent } from './olp-budget/olp-budget.component';
import { OlpInventoryComponent } from './olp-inventory/olp-inventory.component';
import { OlpTeamAssignComponent } from '../../olp-team-assign/olp-team-assign.component';
import { OlpInvoiceComponent } from './olp-invoice/olp-invoice.component';

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
      { path: 'budget', component: OlpBudgetComponent },
      { path: 'inventory', component: OlpInventoryComponent },
      { path: 'team-assign', component: OlpTeamAssignComponent },
      { path: 'invoice', component: OlpInvoiceComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlpRoutingModule { }
