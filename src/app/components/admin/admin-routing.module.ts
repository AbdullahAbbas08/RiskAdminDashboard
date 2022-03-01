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
        path:'Get-Call-Reason', component: CallReasonComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }
