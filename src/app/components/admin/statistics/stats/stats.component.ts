import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/shared/API-Service/statistics.service';
import { Stats_Report } from 'src/app/shared/Models/Stats_Report';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit  {

  StatsReport:Stats_Report[];
  constructor(private statisticsService:StatisticsService) {
    
   }

  ngOnInit(): void {
    this.StatsReport = [];
  this.GetStats();
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

}
