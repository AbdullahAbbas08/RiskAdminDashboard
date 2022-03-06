import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetClient } from 'src/app/shared/Models/GetClient';
import { GetEmployee } from 'src/app/shared/Models/GetEmployee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  //#region  Declare Variables
  response: GenericResponse<GetEmployee>;
  Employee_List: GetEmployee[];
  //#endregion

  //#region constructor
  constructor(private ApiService: EmployeeApiService , private router:Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Employee_List = [];
    this.GetEmployee();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Employee
  GetEmployee() {
    this.ApiService.GetEmployee().subscribe(
      response => {
        this.response = response;
        this.Employee_List = response.data;        
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
  }
  //#endregion

  //#region  Delete Employee 
  DeleteEmployee(id:string){    
    Swal.fire({
      title: ' تحذير !',
      text: "هل انت متأكد من حذف هذا العنصر ؟ ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'إنهاء',
    })
    .then((result) => {

      if (result.isConfirmed) {
          this.ApiService.DeleteEmployee(id).subscribe(
            response=>{
              this.GetEmployee();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف الموظف بنجاح",
                    showConfirmButton: false,
                    timer: 1500}) 
                  },
            err=>{
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: err.error,
              })
            }
          )
        
      } else {
        // Swal.fire(
        //   'Your appointment still active ',
        // );
      }
    }); 
  }
  //#endregion
  
  //#endregion

  //#region Add New Employee
  NavigateToInsert(){
    this.router.navigateByUrl("admin/InsertEmployee");
  }
  //#endregion

  //#region update Employee
  updateEmployee(id:string,model:GetEmployee){
    this.ApiService.Employee = model;
    
    this.router.navigate(['admin/updateEmployee',model.id]);
  }
  //#endregion


}
