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
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    RouterModule
  ],
  exports:[ClientTypeComponent]
})
export class AdminModule { }
