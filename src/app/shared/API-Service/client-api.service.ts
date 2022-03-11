import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetClient } from '../Models/GetClient';
import { environment } from '../../../environments/environment.prod';
import { InsertClient } from '../Models/InsertClient';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { UpdateClient } from '../Models/UpdateClient';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

    //#region Declare variables
    Client:GetClient;

    //#endregion
    //#region  constructor
    
    constructor(private http:HttpClient) { }
    //#endregion
  
      //#region Options
      httpOptions = {
         headers: new HttpHeaders({ 
          //  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 
           'Accept': ' */*' 
          }) };
      //#endregion
  
      GetClient(): Observable<GenericResponse<GetClient>> {
        return this.http.get<GenericResponse<GetClient>>(`${environment.Server_URL}/Client`);
      }

      GetClientIdName(): Observable<GenericResponse<GetClient>> {
        return this.http.get<GenericResponse<GetClient>>(`${environment.Server_URL}/Client/GetAllIdName`);
      }
    
      InsertClient(form:any): Observable<GenericResponseSingle<InsertClient>> {
        return this.http.post<GenericResponseSingle<InsertClient>>(`${environment.Server_URL}/Authentication/RegisterClient`,form,this.httpOptions);
      }

      UpdateClient(form:any): Observable<GenericResponseSingle<UpdateClient>> {
        return this.http.put<GenericResponseSingle<UpdateClient>>(`${environment.Server_URL}/Client`,form,this.httpOptions);
      }
  
      DeleteClient(ClientId:string): Observable<GenericResponseSingle<InsertClient>> {
        return this.http.delete<GenericResponseSingle<InsertClient>>(`${environment.Server_URL}/Client/${ClientId}`);
      }
}
