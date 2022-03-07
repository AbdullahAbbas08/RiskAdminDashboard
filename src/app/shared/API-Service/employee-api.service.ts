import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetEmployee } from '../Models/GetEmployee';
import { environment } from '../../../environments/environment.prod';
import { InsertEmployee } from '../Models/InsertEmployee';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { UpdateClient } from '../Models/UpdateClient';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

     //#region Declare variables
     Employee:GetEmployee;

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
   
       GetEmployee(): Observable<GenericResponse<GetEmployee>> {
         return this.http.get<GenericResponse<GetEmployee>>(`${environment.Server_URL}/Employee`);
       }
     
       InsertEmployee(data:InsertEmployee): Observable<GenericResponseSingle<InsertEmployee>> {
         return this.http.post<GenericResponseSingle<InsertEmployee>>(`${environment.Server_URL}/Authentication/RegisterEmployee`,data,this.httpOptions);
       }
 
       UpdateEmployee(data:GetEmployee): Observable<GenericResponseSingle<GetEmployee>> {
         return this.http.put<GenericResponseSingle<GetEmployee>>(`${environment.Server_URL}/Employee`,data,this.httpOptions);
       }
   
       DeleteEmployee(id:string): Observable<GenericResponseSingle<InsertEmployee>> {
         return this.http.delete<GenericResponseSingle<InsertEmployee>>(`${environment.Server_URL}/Employee/${id}`);
       }
}