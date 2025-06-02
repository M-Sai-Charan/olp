import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlpRoutingModule } from './olp-routing.module';
import { OlpDashboardComponent } from './olp-dashboard/olp-dashboard.component';
import { OlpUsersComponent } from './olp-users/olp-users.component';
import { SharedModule } from '../../shared/app.module';
import { OlpMenuComponent } from './olp-menu/olp-menu.component';
import { OlpLoginComponent } from './olp-login/olp-login.component';
import { OlpEmployeesComponent } from './olp-employees/olp-employees.component';
import { OlpAdminComponent } from './olp-admin/olp-admin.component';
import { OlpBudgetComponent } from './olp-budget/olp-budget.component';

@NgModule({
  declarations: [
    OlpDashboardComponent,
    OlpUsersComponent,
    OlpMenuComponent,
    OlpLoginComponent,
    OlpEmployeesComponent,
    OlpAdminComponent,
    OlpBudgetComponent
  ],
  imports: [
    CommonModule,
    OlpRoutingModule,
    SharedModule
  ]
})
export class OlpModule {}
