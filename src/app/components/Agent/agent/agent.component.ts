import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor( private ApiService:EmployeeApiService) { }
  imgURL:string ;
  Clients:any;

  ngOnInit(): void {
    this.imgURL = "../../../assets/images/statics/personAvatar.png";
    this.GetClientRelated(localStorage.getItem('RiskAuthorization'));
  }

  getClientData(id:string){
    console.log(id);
    
  }
  GetClientRelated(id:string){
    this.ApiService.GetClientRelated(id).subscribe(
      (response)=>{
        this.Clients = response.data;
        console.log("---------- : ",response.data);
        
      },
      (err)=>{
          // console.log(err);
          
      }
    )
  }

}
