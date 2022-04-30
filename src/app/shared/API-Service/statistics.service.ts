import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { Stats_Report } from '../Models/Stats_Report';
import { environment } from '../../../environments/environment.prod';
import { Agent_ReportModel } from '../Models/Agent_ReportModel';
import { CallReason_ReportModel } from '../Models/CallReason_ReportModel';
import { GraphData } from '../Models/GraphData';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  
  //#region  constructor
  constructor(private http:HttpClient) { }
  //#endregion

    //#region Options
    httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
    //#endregion

    Stats_Report(): Observable<GenericResponse<Stats_Report>> {
      return this.http.get<GenericResponse<Stats_Report>>(`${environment.Server_URL}/Admin/Stats_Report`);
    }

    Agent_Report(flag:number): Observable<Agent_ReportModel[]> {
      return this.http.get<Agent_ReportModel[]>(`${environment.Server_URL}/Admin/Agent_Report?f=${flag}`);
    }

    CallReason_Report(flag:number): Observable<CallReason_ReportModel[]> {
      return this.http.get<CallReason_ReportModel[]>(`${environment.Server_URL}/Admin/CallReason_Report?f=${flag}`);
    }
    GraphData(f:number): Observable<any> {
      return this.http.get<any>(`${environment.Server_URL}/Admin/GraphData?flag=${f}`);
      }
}
