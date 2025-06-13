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
import { OlpInventoryComponent } from './olp-inventory/olp-inventory.component';
import { OlpTeamAssignComponent } from '../../olp-team-assign/olp-team-assign.component';
import { OlpInvoiceComponent } from './olp-invoice/olp-invoice.component';
import { OlpTasksComponent } from './olp-tasks/olp-tasks.component';
import { OlpService } from './olp.service';
import { OlpInventoryAssignComponent } from './olp-inventory-assign/olp-inventory-assign.component';
import { OlpClientDetailsComponent } from './olp-client-details/olp-client-details.component';

@NgModule({
  declarations: [
    OlpDashboardComponent,
    OlpUsersComponent,
    OlpMenuComponent,
    OlpLoginComponent,
    OlpEmployeesComponent,
    OlpAdminComponent,
    OlpBudgetComponent,
    OlpInventoryComponent,
    OlpTeamAssignComponent,
    OlpInvoiceComponent,
    OlpTasksComponent,
    OlpInventoryAssignComponent,
    OlpClientDetailsComponent
  ],
  imports: [
    CommonModule,
    OlpRoutingModule,
    SharedModule
  ],
  providers: [OlpService]
})
export class OlpModule { }
