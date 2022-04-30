import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/shared/API-Service/statistics.service';
import { Agent_ReportModel } from 'src/app/shared/Models/Agent_ReportModel';
import { CallReason_ReportModel } from 'src/app/shared/Models/CallReason_ReportModel';
import { GraphData } from 'src/app/shared/Models/GraphData';
import { Stats_Report } from 'src/app/shared/Models/Stats_Report';
import * as chartData from '../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit,OnDestroy  {

  StatsReport:Stats_Report[];
  Agent_ReportModelDay:Agent_ReportModel[];
  Agent_ReportModelMonth:Agent_ReportModel[];
  Agent_ReportModelYear:Agent_ReportModel[];
  Agent_ReportModelOverall:Agent_ReportModel[];
 
 
  CallReason_ReportDaily:CallReason_ReportModel[];
  CallReason_ReportMonthly:CallReason_ReportModel[];
  CallReason_ReportYearly:CallReason_ReportModel[];
  CallReason_ReportOverall:CallReason_ReportModel[];
  GraphDataDay:GraphData;


   // Charts
   public currentSales = chartData.currentSales;
   public smallBarCharts = chartData.smallBarCharts;
   public marketValue = chartData.marketValue;
   public knob = chartData.knob;
   public knobRight = chartData.knobRight;

  constructor(private statisticsService:StatisticsService) {
    
   }
   
  ngOnDestroy(): void {
    localStorage.removeItem("callInListPerDay");        
    localStorage.removeItem("callOutListPerDay");        
    localStorage.removeItem("callNameList")
  }

  ngOnInit(): void {
    document.getElementById('overall')?.classList.add('active');
    document.getElementById('annual')?.classList.remove('active');
    document.getElementById('monthly')?.classList.remove('active');
    document.getElementById('daily')?.classList.remove('active');

    this.StatsReport = [];
    this.Agent_ReportModelDay = [];
    this.Agent_ReportModelMonth = [];
    this.Agent_ReportModelYear = [];
    this.Agent_ReportModelOverall = [];
    
    this.CallReason_ReportDaily = []
    this.CallReason_ReportMonthly = []
    this.CallReason_ReportYearly= []
    this.CallReason_ReportOverall =[]

   this.GraphDataDay = new GraphData();
    
  this.GetStats();
  this.Agent_Report();
  this.CallReason_Report();
  this.GraphData(2);
  }

  GetStats(){
    this.statisticsService.Stats_Report().subscribe(
      (res)=>{
        this.StatsReport = res.data;
        // console.log(this.StatsReport);
        
      },
      (err)=>{}
    )
  }


  Agent_Report(){
    this.statisticsService.Agent_Report(1).subscribe(
      (res)=>{
        this.Agent_ReportModelDay = res;
        // console.log(this.Agent_ReportModelDay);
        
      },
      (err)=>{}
    )
    this.statisticsService.Agent_Report(2).subscribe(
      (res)=>{
        this.Agent_ReportModelMonth = res;
      },
      (err)=>{}
    )
    this.statisticsService.Agent_Report(3).subscribe(
      (res)=>{
        this.Agent_ReportModelYear = res;        
      },
      (err)=>{}
    )
    this.statisticsService.Agent_Report(4).subscribe(
      (res)=>{
        this.Agent_ReportModelOverall = res;        
      },
      (err)=>{}
    )
  }


  CallReason_Report(){
    this.statisticsService.CallReason_Report(1).subscribe(
      (res)=>{
        this.CallReason_ReportDaily = res;
        // console.log(this.Agent_ReportModelDay);
        
      },
      (err)=>{}
    )
    this.statisticsService.CallReason_Report(2).subscribe(
      (res)=>{
        this.CallReason_ReportMonthly = res;
      },
      (err)=>{}
    )
    this.statisticsService.CallReason_Report(3).subscribe(
      (res)=>{
        this.CallReason_ReportYearly = res;        
      },
      (err)=>{}
    )
    this.statisticsService.CallReason_Report(4).subscribe(
      (res)=>{
        this.CallReason_ReportOverall = res;        
      },
      (err)=>{}
    )
  }

  GraphData(flag:number){
    
    this.statisticsService.GraphData(flag).subscribe(
      (res)=>{        
        this.GraphDataDay = res
        this.GraphDataDay.callCount = res["callCount"]
        this.GraphDataDay.callInCount = res["callInCount"]
        this.GraphDataDay.callOutCount = res["callOutCount"]
        this.GraphDataDay.clientCount = res["clientCount"]
        this.GraphDataDay.clientTypeCount = res["clientTypeCount"]
        this.GraphDataDay.employeeCount = res["employeeCount"]

        if(localStorage.getItem("callInList")){
          localStorage.removeItem("callInList")
          localStorage.removeItem("callOutList")
          localStorage.removeItem("callNameList")
        }

 

        localStorage.setItem("callInList",JSON.stringify(res["callIn"]));        
        localStorage.setItem("callOutList",JSON.stringify(res["callOut"]));        
        localStorage.setItem("callNameList",JSON.stringify(res["callName"]));   
        
        chartData.currentSales.series = [{
          // out call
          name: ' المكالمات الصادرة',
          data :res["callIn"]
        },
         {
          // in call
          name: 'المكالمات الواردة',
          data: res["callOut"]
        }
      ];

      chartData.currentSales.xaxis['categories'] = res["callName"];
      },
      (err)=>{

      }
    ) 
  }

  Daily(){
    this.GraphData(1) ;
    document.getElementById('overall')?.classList.remove('active');
    document.getElementById('annual')?.classList.remove('active');
    document.getElementById('monthly')?.classList.remove('active');
    document.getElementById('daily')?.classList.add('active');
  }

  Monthly(){
    this.GraphData(2) ; 
    document.getElementById('overall')?.classList.remove('active');
    document.getElementById('annual')?.classList.remove('active');
    document.getElementById('monthly')?.classList.add('active');
    document.getElementById('daily')?.classList.remove('active');
  }

  Yearly(){
    this.GraphData(3) ; 
    document.getElementById('overall')?.classList.remove('active');
    document.getElementById('annual')?.classList.add('active');
    document.getElementById('monthly')?.classList.remove('active');
    document.getElementById('daily')?.classList.remove('active');
  }

  OverAll(){
    this.GraphData(4) ; 
    document.getElementById('overall')?.classList.add('active');
    document.getElementById('annual')?.classList.remove('active');
    document.getElementById('monthly')?.classList.remove('active');
    document.getElementById('daily')?.classList.remove('active');
  }

  

}
