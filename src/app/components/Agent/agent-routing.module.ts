import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';

const routes: Routes = [
  {
    path: '',children:[
      {
        path:'main', component: AgentComponent
      },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]

})
export class AgentRoutingModule { }
