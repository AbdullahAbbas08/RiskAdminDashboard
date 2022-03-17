import { CommonModule } from "@angular/common";
import { AgentRoutingModule } from "./agent-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from "@angular/router";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgModule } from "@angular/core";




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[]
})
export class AgentModuleModule { }
