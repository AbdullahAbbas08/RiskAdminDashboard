import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeComponent } from './lookups/ClientType/client-type/client-type.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { ListClientTypeComponent } from './lookups/ClientType/list-client-type/list-client-type.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GovernorateComponent } from './lookups/Governorate/insert-Governorate/insert-Governorate.component';
import { ListGovernorateComponent } from './lookups/Governorate/list-governorate/list-governorate.component';
import { ListCitiesComponent } from './lookups/Cities/list-cities/list-cities.component';
import { InsertCitiesComponent } from './lookups/Cities/insert-cities/insert-cities.component';
import { CallReasonComponent } from './lookups/CallReason/CallReason/CallReason.component';
import { InsertCallReasonComponent } from './lookups/CallReason/InsertCallReason/InsertCallReason.component';
import { SourceMarketComponent } from './lookups/SourceMarketing/source-market/source-market.component';
import { InsertSourceMarketComponent } from './lookups/SourceMarketing/insert-source-market/insert-source-market.component';
import { ClientComponent } from './users/clients/Client/Client.component';
import { InsertClientComponent } from './users/clients/InsertClient/InsertClient.component';
import { RouterModule } from '@angular/router';
import { InsertEmployeeComponent } from './users/employee/insert-employee/insert-employee.component';
import { EmployeeComponent } from './users/employee/List-Employees/employee.component';
import { CustomerServiceComponent } from './users/Customer-Service/customer-service/customer-service.component';
import { InsertCustomerServiceComponent } from './users/Customer-Service/InsertCustomerService/InsertCustomerService.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClientAgentComponent } from './Reports/client-agent/client-agent.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { ClientsComponent } from './Reports/clients/clients.component';
import { ClientCallComponent } from './Reports/client-call/client-call.component';
import { ClientCallDetailsComponent } from './Reports/client-call-details/client-call-details.component';
import { CallStartEndReportComponent } from './Reports/Call_Start_End/call-start-end-report.component';
import { StatsComponent } from './statistics/stats/stats.component';
import { AgentListStatComponent } from './statistics/agent-list-stat/agent-list-stat.component';
import { CallReasonStatComponent } from './statistics/call-reason-stat/call-reason-stat.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ClientTypeComponent,
    ListClientTypeComponent,
    GovernorateComponent,
    ListGovernorateComponent,
    ListCitiesComponent,
    InsertCitiesComponent,
    CallReasonComponent,
    InsertCallReasonComponent,
    SourceMarketComponent,
    InsertSourceMarketComponent,
    ClientComponent,
    InsertClientComponent,
    InsertEmployeeComponent,
    InsertEmployeeComponent,
    EmployeeComponent,
    CustomerServiceComponent,
    InsertCustomerServiceComponent,
    ClientAgentComponent,
    ClientsComponent,
    ClientCallComponent,
    ClientCallDetailsComponent,
    CallStartEndReportComponent,
    StatsComponent,
    AgentListStatComponent,
    CallReasonStatComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    RouterModule,
    NgApexchartsModule,
    NgxPrintElementModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[ClientTypeComponent]
})
export class AdminModule { }
