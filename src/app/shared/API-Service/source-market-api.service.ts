import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { InsertSourceMarket } from '../Models/InsertSourceMarket';
import { GetSourceMarket } from '../Models/get-source-market';

@Injectable({
  providedIn: 'root'
})
export class SourceMarketApiService {

        //#region Declare variables
        title:string;
        order:number;
        //#endregion
        
        //#region  constructor
        constructor(private http:HttpClient) { }
        //#endregion
      
          //#region Options
          httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
          //#endregion
      
          Get(): Observable<GenericResponse<GetSourceMarket>> {
            return this.http.get<GenericResponse<GetSourceMarket>>(`${environment.Server_URL}/SourceMarketing`);
          }
        
          Insert(Data:InsertSourceMarket): Observable<GenericResponseSingle<GetSourceMarket>> {
            return this.http.post<GenericResponseSingle<GetSourceMarket>>(`${environment.Server_URL}/SourceMarketing`,Data);
          }
      
          Update(id:number,Data:InsertSourceMarket): Observable<GenericResponseSingle<GetSourceMarket>> {
            return this.http.put<GenericResponseSingle<GetSourceMarket>>(`${environment.Server_URL}/SourceMarketing/${id}`,Data);
          }
      
          Delete(Id:number): Observable<GenericResponseSingle<InsertSourceMarket>> {
            return this.http.delete<GenericResponseSingle<InsertSourceMarket>>(`${environment.Server_URL}/SourceMarketing/${Id}`);
          }
}
