import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { GetEmployee } from 'src/app/shared/Models/GetEmployee';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import { InsertEmployee } from 'src/app/shared/Models/InsertEmployee';
import { Roles } from 'src/app/shared/Models/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent implements OnInit {

  //#region Decalre varaibles
  EmployeeForm: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  pass:string;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:EmployeeApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   
    if(this.route.snapshot.paramMap.get('id')){
      this.ApiService.Employee =  JSON.parse(localStorage.getItem("RiskEmployeeData"));
      this.InitForm(JSON.parse(localStorage.getItem("RiskEmployeeData")))
      this.update = true;
    }else
    {
      this.update = false;
      this._InitForm();
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(employee:GetEmployee){
    this.EmployeeForm = this._formBuilder.group({
      name: [employee.name, Validators.required],
      username: [employee.userName, Validators.required],
      password: ['***', Validators.nullValidator],
      nationalId: [employee.nationalId, Validators.required],
      mobile: [employee.mobile, Validators.required],
      address: [employee.address, Validators.required],
    });
  }
  _InitForm(){
    this.EmployeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.nullValidator],
      nationalId: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  //#endregion

  //#region  Insert Client-Type Method
  InsertClientType(){    
    
    if(this.EmployeeForm.get('password').value =='')
    {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text:'كلمة المرور مطلوبة',
      })
    }
    else
    {
      this.ApiService.InsertEmployee({ 
        name:this.EmployeeForm.get('name').value ,
        userName:this.EmployeeForm.get('username').value ,
        nationalId:this.EmployeeForm.get('nationalId').value ,
        address:this.EmployeeForm.get('address').value ,
        mobile:this.EmployeeForm.get('mobile').value ,
        password:this.EmployeeForm.get('password').value ,
        Role:Roles.Admin
      } as InsertEmployee).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم إضافة الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetEmployee");
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
    }
 
  }
  //#endregion

  //#region Update Client
  UpdateClientType(){

    let id = this.route.snapshot.paramMap.get('id');

    if(this.EmployeeForm.get('password').value =='***')
     this.pass = this.ApiService.Employee.password;
     else
     this.pass = this.EmployeeForm.get('password').value;

    this.ApiService.UpdateEmployee({ 
      id:id,
      name:this.EmployeeForm.get('name').value ,
      userName:this.EmployeeForm.get('username').value ,
      nationalId:this.EmployeeForm.get('nationalId').value ,
      address:this.EmployeeForm.get('address').value ,
      mobile:this.EmployeeForm.get('mobile').value ,
      password:this.pass ,
      Role:Roles.Admin
    } as GetEmployee).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetEmployee");
        localStorage.removeItem("RiskEmployeeData")
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.message,
        })
      }
    )
  }
  //#endregion


}
