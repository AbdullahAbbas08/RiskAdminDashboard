import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsApiService } from 'src/app/shared/API-Service/reports-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { Client_Agent_Report } from 'src/app/shared/Models/Client_Agent_Report';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { getCities } from 'src/app/shared/Models/getCities';
import { getCitiesWithGovernorate } from 'src/app/shared/Models/getCitiesWithGovernorate';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';
import { IdName } from 'src/app/shared/Models/IdName';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import { Client_Report } from 'src/app/shared/Models/Client_Report';
import { CitiesApiService } from 'src/app/shared/API-Service/cities-api.service';
import { Client_Call_Report } from 'src/app/shared/Models/Client_Call_Report';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { GetCallReason } from 'src/app/shared/Models/get-call-reason';
import { Client_Call_Report_input } from 'src/app/shared/Models/Client_Call_Report_input';
import { Call_Start_End_Report_input } from 'src/app/shared/Models/Call_Start_End_Report_input';

@Component({
  selector: 'app-call-start-end-report',
  templateUrl: './call-start-end-report.component.html',
  styleUrls: ['./call-start-end-report.component.css']
})
export class CallStartEndReportComponent implements OnInit {


  //#region  Declare Variables
  Filtered_List: Client_Report[];
  ClientList: IdName[];
  Client_Report: Client_Report[];
  Client_Type_List: GetClientType[];
  Response_List: getCities[];
  CallReason_List: GetCallReason[];
  City_Filtered_List: getCities[];
  Governorate_List: GetGovernorate[];
  Client_Call_list:Client_Call_Report[];
  Client_Call_list_Filter:Client_Call_Report[];
  Client_Call_Report_input:Call_Start_End_Report_input;

  dateFrom:string ="";
  dateTo:string = "";

  //#endregion

  //#region constructor
  constructor( private ApiService: ReportsApiService,
                private router: Router ) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {

      this.Client_Call_Report_input={
        callDateFrom:this.dateFrom,
        callDateTo:this.dateTo,
      }

    this.GetClient_Report(null,null,-1) ; 
  }
  //#endregion

  //#region Consume API's

  //#region  Get Client_Report
  GetClient_Report(name:string=undefined,mobile:string=undefined,type:number=-1 ) {
    this.ApiService.Client_Report(name,mobile,type).subscribe(
      response => {
        this.Client_Report = response.data;
        this.Filtered_List = response.data;
      },
      err => {
        // console.log(err);
        
        // Swal.fire({
        //   icon: 'error',
        //   title: 'خطأ',
        //   text: err.error,
        // })
      }
    )
  }
  //#endregion

  //#region  Get Client_Report
  Get_Client_Call_Report(date:Call_Start_End_Report_input) {
    if(!(this.dateFrom =="" || this.dateTo == "")){
      this.ApiService.Call_Start_End_Report(date).subscribe(
        response => {
          console.log(response);
          
          this.Client_Call_list =response.data; 
          this.Client_Call_list_Filter =response.data; 
        //  console.log("res : ",this.Client_Call_list);
         
        },
        err => {
          // console.log(err);
          
          // Swal.fire({
          //   icon: 'error',
          //   title: 'خطأ',
          //   text: err.error,
          // })
        }
      )
    }
    else
    {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'خطأ',
      //   text: "أختر تاريخ بداية ونهاية المكالمات",
      // })
    }
  }
  //#endregion

  //#endregion

     
     datefromchange(event){
       this.dateFrom = event.target.value;
       this.Client_Call_Report_input.callDateFrom =  event.target.value;

      //  console.log(" this.dateFrom : ", this.Client_Call_Report_input.callDateFrom);

      if(this.dateTo !="")
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     datetochange(event){
      this.dateTo = event.target.value;
      this.Client_Call_Report_input.callDateTo =  event.target.value;
      // console.log(" this.dateTo : ", this.Client_Call_Report_input.callDateTo);
      
      if(this.dateFrom !="")
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     MoveDetail(item:any){
       localStorage.setItem("clientcalldetail",JSON.stringify(item))              
       this.router.navigateByUrl("/content/admin/client-call-detail");
     }
}
