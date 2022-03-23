import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { getCities } from '../Models/getCities';
import { GetCallReason } from '../Models/get-call-reason';
import { InsertCallReason } from '../Models/insert-call-reason';
@Injectable({
  providedIn: 'root'
})
export class CallReasonApiService {

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
    
        GetCallReason(): Observable<GenericResponse<GetCallReason>> {
          return this.http.get<GenericResponse<GetCallReason>>(`${environment.Server_URL}/CallReason`);
        }

        GetReasonsRelatedWithClientType(ClientId:string): Observable<GenericResponse<GetCallReason>> {
          return this.http.get<GenericResponse<GetCallReason>>(`${environment.Server_URL}/CallReasonClientType/GetReasonsRelatedWithClientType?ClientID=${ClientId}`);
        }
      
        InsertCallReason(Data:InsertCallReason): Observable<GenericResponseSingle<GetCallReason>> {
          return this.http.post<GenericResponseSingle<GetCallReason>>(`${environment.Server_URL}/CallReason`,Data);
        }
    
        CallReasonClientType(Data:any): Observable<any> {
          return this.http.post<any>(`${environment.Server_URL}/CallReasonClientType/CallReasonClientType`,Data);
        }
    
        UpdateCallReason(id:number,Data:InsertCallReason): Observable<GenericResponseSingle<getCities>> {
          return this.http.put<GenericResponseSingle<getCities>>(`${environment.Server_URL}/CallReason/${id}`,Data);
        }
    
        DeleteCallReason(Id:number): Observable<GenericResponseSingle<InsertCallReason>> {
          return this.http.delete<GenericResponseSingle<InsertCallReason>>(`${environment.Server_URL}/CallReason/${Id}`);
        }
}
