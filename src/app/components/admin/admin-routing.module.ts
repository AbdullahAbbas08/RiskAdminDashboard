import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientTypeComponent } from './lookups/ClientType/client-type/client-type.component';
import { GovernorateComponent } from './lookups/Governorate/insert-Governorate/insert-Governorate.component';
import { ListClientTypeComponent } from './lookups/ClientType/list-client-type/list-client-type.component';
import { ListGovernorateComponent } from './lookups/Governorate/list-governorate/list-governorate.component';
import { InsertCitiesComponent } from './lookups/Cities/insert-cities/insert-cities.component';
import { ListCitiesComponent } from './lookups/Cities/list-cities/list-cities.component';
import { CallReasonComponent } from './lookups/CallReason/CallReason/CallReason.component';
import { InsertCallReasonComponent } from './lookups/CallReason/InsertCallReason/InsertCallReason.component';
import { SourceMarketComponent } from './lookups/SourceMarketing/source-market/source-market.component';
import { InsertSourceMarketComponent } from './lookups/SourceMarketing/insert-source-market/insert-source-market.component';
import { ClientComponent } from './users/clients/Client/Client.component';
import { InsertClientComponent } from './users/clients/InsertClient/InsertClient.component';
import { EmployeeComponent } from './users/employee/List-Employees/employee.component';
import { InsertEmployeeComponent } from './users/employee/insert-employee/insert-employee.component';

const routes: Routes = [
  {
    path: '',children:[
      {
        path:'client-type', component: ClientTypeComponent
      },
      {
        path:'Get-client-type', component: ListClientTypeComponent
      },
      {
        path:'update-client-type/:id', component: ClientTypeComponent
      },
      {
        path:'insert-governorate', component: GovernorateComponent
      },
      {
        path:'update-governorate/:id', component: GovernorateComponent
      },
      {
        path:'Get-governorate', component: ListGovernorateComponent
      },
      {
        path:'Get-cities', component: ListCitiesComponent
      },
      {
        path:'insert-city', component: InsertCitiesComponent
      },
      {
        path:'update-city/:id', component: InsertCitiesComponent
      },
      {
        path:'insert-call-reason', component: InsertCallReasonComponent
      },
      {
        path:'update-call-reason/:id', component: InsertCallReasonComponent
      },
      {
        path:'Get-Call-Reason', component: CallReasonComponent
      },
      {
        path:'InsertSourceMarket', component: InsertSourceMarketComponent
      },
      {
        path:'updateSourceMarket/:id', component: InsertSourceMarketComponent
      },
      {
        path:'GetSourceMarket', component: SourceMarketComponent
      },
      {
        path:'GetClient', component: ClientComponent
      },
      {
        path:'InsertClient', component: InsertClientComponent
      },
      {
        path:'updateClient/:id', component: InsertClientComponent
      },
      {
        path:'GetEmployee', component: EmployeeComponent
      },
      {
        path:'InsertEmployee', component: InsertEmployeeComponent
      },
      {
        path:'updateEmployee/:id', component: InsertEmployeeComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }
